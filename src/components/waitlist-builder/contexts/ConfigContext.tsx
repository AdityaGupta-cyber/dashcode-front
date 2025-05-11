
import React, { createContext, useContext, useState, ReactNode } from "react";

interface FormField {
  id: string;
  label: string;
  type: "text" | "email" | "number" | "phone" | "url";
  placeholder: string;
  required: boolean;
}

interface Config {
  title: string;
  placeholderText: string;
  buttonText: string;
  successMessage: string;
  showLogo: boolean;
  logoSize: number;
  showSocialProof: boolean;
  enableReferrals: boolean;
  whiteLabel: boolean;
  // Design settings
  buttonBGColor: string;
  buttonBorderColor: string;
  buttonBorderWidth: string;
  buttonBorderRadius: string;
  buttonTextColor: string;
  buttonTextBold: string;
  inputBoxBGColor: string;
  inputBoxBorderColor: string;
  inputBoxBorderWidth: string;
  inputBoxBorderRadius: string;
  pingDotColor: string;
  refBackgroundColor: string;
  signupTextColor: string;
  enableEmailVerification: boolean;
  // Feature settings
  showPosition: boolean;
  positionsToSkip: number;
  showProgressCount: boolean;
  progressUpdateFrequency: "daily" | "weekly" | "monthly";
  currentPosition: number; // For demo purposes
  totalSignups: number; // For demo purposes
  // New image & background settings
  logoUrl: string;
  backgroundUrl: string;
  backgroundOverlay: string;
  backgroundOpacity: number;
  // Additional features
  enableCaptcha: boolean;
  showCountdown: boolean;
  countdownDate: string; // ISO string date
  collectName: boolean;
  collectCompany: boolean;
  // Custom form fields
  customFields: FormField[];
}

interface ConfigContextType {
  config: Config;
  updateConfig: (updates: Partial<Config>) => void;
  addCustomField: () => void;
  updateCustomField: (id: string, updates: Partial<FormField>) => void;
  removeCustomField: (id: string) => void;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export const ConfigProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<Config>({
    title: "Join our waitlist",
    placeholderText: "Email",
    buttonText: "Join the waitlist",
    successMessage: "Success! You're on the waitlist 🎉",
    showLogo: true,
    logoSize: 1,
    showSocialProof: true,
    enableReferrals: false,
    whiteLabel: false,
    // Design settings with default values
    buttonBGColor: "#9333ea",
    buttonBorderColor: "#9D6CAE",
    buttonBorderWidth: "0px",
    buttonBorderRadius: "0.5rem",
    buttonTextColor: "#FFFFFF",
    buttonTextBold: "400",
    inputBoxBGColor: "#FFFFFF",
    inputBoxBorderColor: "#DCDCDC",
    inputBoxBorderWidth: "1px",
    inputBoxBorderRadius: "0.5rem",
    pingDotColor: "#9333ea",
    refBackgroundColor: "#FFFFFF",
    signupTextColor: "#0A0A0A",
    enableEmailVerification: false,
    // Feature settings
    showPosition: true,
    positionsToSkip: 3,
    showProgressCount: true,
    progressUpdateFrequency: "weekly",
    currentPosition: 42, // Dummy value for demo
    totalSignups: 128, // Dummy value for demo
    // New image & background settings
    logoUrl: "",
    backgroundUrl: "",
    backgroundOverlay: "rgba(0, 0, 0, 0.5)",
    backgroundOpacity: 0.7,
    // Additional features
    enableCaptcha: false,
    showCountdown: false,
    countdownDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
    collectName: false,
    collectCompany: false,
    // Custom form fields
    customFields: [],
  });

  const updateConfig = (updates: Partial<Config>) => {
    setConfig((prev) => ({ ...prev, ...updates }));
  };

  // Add a new custom field
  const addCustomField = () => {
    const newField: FormField = {
      id: `field-${Date.now()}`,
      label: "New Field",
      type: "text",
      placeholder: "Enter value",
      required: false,
    };

    setConfig((prev) => ({
      ...prev,
      customFields: [...prev.customFields, newField],
    }));
  };

  // Update an existing custom field
  const updateCustomField = (id: string, updates: Partial<FormField>) => {
    setConfig((prev) => ({
      ...prev,
      customFields: prev.customFields.map((field) =>
        field.id === id ? { ...field, ...updates } : field
      ),
    }));
  };

  // Remove a custom field
  const removeCustomField = (id: string) => {
    setConfig((prev) => ({
      ...prev,
      customFields: prev.customFields.filter((field) => field.id !== id),
    }));
  };

  return (
    <ConfigContext.Provider 
      value={{ config, updateConfig, addCustomField, updateCustomField, removeCustomField }}
    >
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = (): ConfigContextType => {
  const context = useContext(ConfigContext);
  if (context === undefined) {
    throw new Error("useConfig must be used within a ConfigProvider");
  }
  return context;
};
