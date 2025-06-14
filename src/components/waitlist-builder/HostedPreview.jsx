import React from 'react';
import { ConfigProvider, useConfig } from "./contexts/ConfigContext";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { TrendingUp, Check, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { Progress } from "./ui/progress";
import { AnimatedTooltip } from "./ui/animated-tooltip";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchWaitlistConfigById } from "@/store/api/waitlist/waitlistSlice";

// Sample people data for the social proof (same as WidgetPreview)
const people = [
  {
    id: 1,
    name: "John Doe",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: 2,
    name: "Jane Smith",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    id: 3,
    name: "Robert Johnson",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    id: 4,
    name: "Emily Davis",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
];

function Preview() {
  const { config } = useConfig();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [customFieldValues, setCustomFieldValues] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showReferral, setShowReferral] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      if (config.enableReferrals) {
        setShowReferral(true);
      } else {
        setSubmitted(true);
      }
    }
  };

  const handleCustomFieldChange = (fieldId, value) => {
    setCustomFieldValues(prev => ({
      ...prev,
      [fieldId]: value
    }));
  };

  const handleCopyReferral = () => {
    // In a real app, would copy a referral link
    setSubmitted(true);
    setShowReferral(false);
  };

  // Calculate position percentage for progress bar
  const positionPercentage = (config.currentPosition / config.totalSignups) * 100;

  // Container and widget styles (same as WidgetPreview)
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    padding: '20px',
    boxSizing: 'border-box'
  };

  const widgetStyle = {
    width: '380px',
    maxWidth: '100%',
    height: 'auto',
    minHeight: '500px',
    maxHeight: '90vh',
    overflow: 'hidden',
    border: '1px solid #e2e8f0',
    borderRadius: '16px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    position: 'relative'
  };

  const backgroundStyle = config.backgroundUrl ? {
    backgroundImage: `linear-gradient(${config.backgroundOverlay}, ${config.backgroundOverlay}), url(${config.backgroundUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: '0.5rem',
  } : {};

  return (
    <div style={containerStyle}>
      <div style={{...widgetStyle, ...backgroundStyle}}>
        <div className="p-8 flex-1 flex flex-col ">
          {submitted ? (
            <div className="text-center py-8 flex-1 flex flex-col items-center justify-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-medium mb-3" style={{ color: config.signupTextColor }}>
                {config.successMessage}
              </h3>
              <p className="text-gray-600 mb-6">
                We'll notify you when we launch.
              </p>
              
              {config.showPosition && (
                <div className="mt-4 p-4 rounded-lg border w-full max-w-sm" style={{ backgroundColor: config.refBackgroundColor }}>
                  <div className="flex items-center justify-center mb-2">
                    <TrendingUp className="h-4 w-4 mr-2" style={{ color: config.buttonBGColor }} />
                    <span style={{ color: config.signupTextColor }}>
                      You are position #{config.currentPosition} in the queue
                    </span>
                  </div>
                  <Progress value={positionPercentage} className="h-2 mt-2" />
                  
                  {config.showProgressCount && (
                    <p className="text-xs mt-2 text-center text-gray-500">
                      We'll send you {config.progressUpdateFrequency} updates on your position
                    </p>
                  )}
                </div>
              )}
            </div>
          ) : showReferral ? (
            <div className="space-y-6 p-6 border rounded-lg flex-1 flex flex-col" style={{ backgroundColor: config.refBackgroundColor }}>
              <h3 className="text-xl font-medium text-center" style={{ color: config.signupTextColor }}>
                Share your referral link
              </h3>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  <Check className="h-5 w-5 mr-2" style={{ color: config.buttonBGColor }} />
                  <p className="text-sm font-medium" style={{ color: config.signupTextColor }}>
                    Skip {config.positionsToSkip} positions for each referral!
                  </p>
                </div>
                <div className="text-sm text-gray-500 text-center">
                  {config.referralMessage || "Share this link with friends to move up in the waitlist!"}
                </div>
              </div>
              
              <div className="flex gap-2">
                <Input 
                  value={`yourwaitlist.com/ref/${Math.random().toString(36).substring(7)}`} 
                  readOnly
                  style={{
                    backgroundColor: config.inputBoxBGColor,
                    borderColor: config.inputBoxBorderColor,
                    borderWidth: config.inputBoxBorderWidth,
                    borderRadius: config.inputBoxBorderRadius
                  }}
                />
                <Button onClick={handleCopyReferral} style={{
                  backgroundColor: config.buttonBGColor,
                  color: config.buttonTextColor,
                  fontWeight: config.buttonTextBold,
                  borderColor: config.buttonBorderColor,
                  borderWidth: config.buttonBorderWidth,
                  borderRadius: config.buttonBorderRadius
                }}>
                  Copy
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6 flex-1 flex flex-col">
              {config.showLogo && (
                <div className="flex justify-center mb-6">
                  {config.logoUrl ? (
                     <div 
                     className="w-16 h-16 max-w-16 max-h-12 bg-purple-200 rounded-lg flex items-center justify-center"
                     style={{ 
                       transform: `scale(${config.logoSize})`,
                       backgroundColor: `${config.buttonBGColor}20`, // 20% opacity version of button color
                       borderRadius: config.logoBorderRadius
                     }}
                   >
                    <img 
                      src={config.logoUrl} 
                      alt="Logo" 
                      className="h-full w-full flex items-center justify-center object-cover" 
                      style={{ 
                        borderRadius: config.logoBorderRadius
                      }}
                    />
                    </div>
                  ) : (
                    <div 
                      className="w-16 h-16 bg-purple-200 rounded-lg flex items-center justify-center"
                      style={{ 
                        transform: `scale(${config.logoSize})`,
                        backgroundColor: `${config.buttonBGColor}20` // 20% opacity version of button color
                      }}
                    >
                      <svg viewBox="0 0 24 24" className="w-10 h-10" style={{ fill: config.buttonBGColor }}>
                        <path d="M12 2L4 7l8 5 8-5-8-5zM4 15l8 5 8-5M4 11l8 5 8-5" />
                      </svg>
                    </div>
                  )}
                </div>
              )}
              
              <div className="text-center">
                <h2 
                  className={`text-${config.titleSize || '3xl'} ${config.titleBold !== false ? 'font-bold' : 'font-normal'} mb-3`}
                  style={{ color: config.titleColor || config.signupTextColor }}
                >
                  {config.title}
                </h2>
                
                <p 
                  className={`mb-6 mx-auto max-w-sm ${config.descriptionBold ? 'font-medium' : 'font-normal'}`}
                  style={{ color: config.descriptionColor || `${config.signupTextColor}99` }}
                >
                  {config.description || "Updates, news, exclusive discounts, and so much more cool stuff happens behind-the-scenes"}
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-3">
                {config.collectName && (
                  <Input
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{
                      backgroundColor: config.inputBoxBGColor,
                      borderColor: config.inputBoxBorderColor,
                      borderWidth: config.inputBoxBorderWidth,
                      borderRadius: config.inputBoxBorderRadius
                    }}
                  />
                )}
                
                <Input
                  type="email"
                  placeholder={config.placeholderText}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    backgroundColor: config.inputBoxBGColor,
                    borderColor: config.inputBoxBorderColor,
                    borderWidth: config.inputBoxBorderWidth,
                    borderRadius: config.inputBoxBorderRadius
                  }}
                />
                
                {config.collectCompany && (
                  <Input
                    placeholder="Company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    style={{
                      backgroundColor: config.inputBoxBGColor,
                      borderColor: config.inputBoxBorderColor,
                      borderWidth: config.inputBoxBorderWidth,
                      borderRadius: config.inputBoxBorderRadius
                    }}
                  />
                )}
                
                {/* Custom Fields */}
                {config.customFields.map(field => (
                  <Input
                    key={field.id}
                    type={field.type === "number" ? "number" : 
                         field.type === "email" ? "email" : 
                         field.type === "url" ? "url" : 
                         field.type === "phone" ? "tel" : "text"}
                    placeholder={field.placeholder || field.label}
                    value={customFieldValues[field.id] || ""}
                    onChange={(e) => handleCustomFieldChange(field.id, e.target.value)}
                    required={field.required}
                    style={{
                      backgroundColor: config.inputBoxBGColor,
                      borderColor: config.inputBoxBorderColor,
                      borderWidth: config.inputBoxBorderWidth,
                      borderRadius: config.inputBoxBorderRadius
                    }}
                  />
                ))}
                
                <Button 
                  className="w-full" 
                  type="submit"
                  style={{
                    backgroundColor: config.buttonBGColor || '#3b82f6',
                    color: config.buttonTextColor || '#ffffff',
                    fontWeight: config.buttonTextBold ? 'bold' : 'normal',
                    borderColor: config.buttonBorderColor || 'transparent',
                    borderWidth: config.buttonBorderWidth || '0px',
                    borderRadius: config.buttonBorderRadius || '0.375rem'
                  }}
                >
                  {config.buttonText || "Join the waitlist"}
                </Button>
              </form>

              {config.showSocialProof && (
                <div className="flex flex-col items-center space-y-2 mt-4">
                  <div className="flex -space-x-2">
                    <AnimatedTooltip items={people} />
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: config.pingDotColor }}></div>
                    <p className="text-sm" style={{ color: config.signupTextColor }}>
                      {config.totalSignups > 0 ? `Join ${config.totalSignups} others on the waitlist` : "Be the first to join"}
                    </p>
                  </div>
                </div>
              )}
              
              {/* Position Count - Show only if social proof is disabled */}
              {config.showPosition && !config.showSocialProof && (
                <div className="text-center text-sm text-gray-600 mt-4">
                  <span>Join {config.totalSignups} others on the waitlist</span>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* White Label Footer - Only show if not disabled */}
        {!config.whiteLabel && (
          <div className={`py-2 px-3 ${config.buttonTextColor} text-xs flex items-center justify-end`} >
            <span>made with</span>
            <Heart className="h-3 w-3 text-purple-400 mx-1 fill-current" />
            <span>by</span>
            <a href="#" className={`font-medium ml-1 ${config.buttonTextColor}`}>Ather</a>
          </div>
        )}
      </div>
    </div>
  );
}

export default function HostedPreview() {
    // Get the waitlistId from URL params
    const { waitlistId } = useParams();
    // Get the saved waitlist config from Redux store
    const savedConfig = useSelector(state => state.waitlist.config);
    const isLoading = useSelector(state => state.waitlist.isLoading);
    const error = useSelector(state => state.waitlist.error);
    const dispatch = useDispatch();
    
    // Fetch config data when component mounts
    useEffect(() => {
        console.log("HostedPreview mounted with waitlistId:", waitlistId);
        if (waitlistId) {
            dispatch(fetchWaitlistConfigById(waitlistId));
        }
    }, [waitlistId, dispatch]);
    
    if (isLoading) {
        return <div className="flex items-center justify-center h-screen">Loading...</div>;
    }
    
    if (error) {
        return <div className="flex items-center justify-center h-screen text-red-500">Error: {error}</div>;
    }
    
    return (
        <ConfigProvider initialConfig={savedConfig}>
            <Preview />
        </ConfigProvider>
    );
}