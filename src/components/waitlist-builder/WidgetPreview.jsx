import { useConfig } from "./contexts/ConfigContext";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Input } from "./ui/input";
import Button from "../ui/Button";
import { Zap, TrendingUp, Check, Upload } from "lucide-react";
import { useState } from "react";
import { Progress } from "./ui/progress";

const WidgetPreview = () => {
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

  const resetForm = () => {
    setSubmitted(false);
    setShowReferral(false);
    setEmail("");
    setName("");
    setCompany("");
    setCustomFieldValues({});
  };

  const avatars = [
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg"
  ];

  // Calculate position percentage for visual display
  const positionPercentage = Math.max(
    0,
    Math.min(100, 100 - (config.currentPosition / config.totalSignups * 100))
  );
  
  // Calculate time remaining if countdown is enabled
  const getTimeRemaining = () => {
    const total = Date.parse(config.countdownDate) - Date.now();
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((total / (1000 * 60)) % 60);
    
    return { total, days, hours, minutes };
  };
  
  const timeRemaining = getTimeRemaining();

  const backgroundStyle = config.backgroundUrl ? {
    backgroundImage: `linear-gradient(${config.backgroundOverlay}, ${config.backgroundOverlay}), url(${config.backgroundUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: '0.5rem',
  } : {};

  return (
    <div 
      className="w-full max-w-md mx-auto p-6 rounded-lg"
      style={{
        ...backgroundStyle,
        position: 'relative',
      }}
    >
      {submitted ? (
        <div className="text-center p-6">
          <h3 className="text-lg font-medium" style={{ color: config.signupTextColor }}>
            {config.successMessage}
          </h3>
          
          {config.showPosition && (
            <div className="mt-4 p-4 rounded-lg border" style={{ backgroundColor: config.refBackgroundColor }}>
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="h-4 w-4 mr-2" style={{ color: config.buttonBGColor }} />
                <span style={{ color: config.signupTextColor }}>
                  You are position #{config.currentPosition} in the queue
                </span>
              </div>
              <Progress value={positionPercentage} className="h-2 mt-2" />
            </div>
          )}
          
          {config.showProgressCount && (
            <div className="mt-4 p-4 rounded-lg border" style={{ backgroundColor: config.refBackgroundColor }}>
              <div className="flex items-center justify-center mb-1">
                <Check className="h-4 w-4 mr-2" style={{ color: config.buttonBGColor }} />
                <span style={{ color: config.signupTextColor }}>Progress updates</span>
              </div>
              <p className="text-sm text-gray-500">
                You'll receive {config.progressUpdateFrequency} updates about your position in the queue
              </p>
            </div>
          )}
          
          <button 
            className="text-blue-500 hover:text-blue-700 text-sm mt-4"
            onClick={resetForm}
          >
            Reset demo
          </button>
        </div>
      ) : showReferral ? (
        <div className="space-y-6 p-4 border rounded-lg" style={{ backgroundColor: config.refBackgroundColor }}>
          <h3 className="text-lg font-medium text-center" style={{ color: config.signupTextColor }}>
            Share your referral link
          </h3>
          
          <div className="bg-purple-50 p-3 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <Check className="h-5 w-5 mr-2" style={{ color: config.buttonBGColor }} />
              <p className="text-sm font-medium" style={{ color: config.signupTextColor }}>
                Skip {config.positionsToSkip} positions for each referral!
              </p>
            </div>
            <div className="text-sm text-gray-500 text-center">
              Your friends will also start ahead of the regular queue
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
        <div className="space-y-6">
          {config.showLogo && (
            <div className="flex justify-center">
              {config.logoUrl ? (
                <img 
                  src={config.logoUrl} 
                  alt="Logo" 
                  className="h-12 w-auto" 
                  style={{ transform: `scale(${config.logoSize})` }}
                />
              ) : (
                <div 
                  className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold"
                  style={{ 
                    transform: `scale(${config.logoSize})`,
                    backgroundColor: config.buttonBGColor
                  }}
                >
                  A
                </div>
              )}
            </div>
          )}
          
          {config.title && (
         <h2
         className="text-xl font-semibold text-center mb-3 break-words"
         style={{ color: config.signupTextColor }}
       >
         {config.title}
       </h2>
       
          )}
          
          {config.showCountdown && (
            <div className="bg-opacity-80 p-3 rounded-lg flex justify-center" style={{ backgroundColor: config.refBackgroundColor }}>
              <div className="flex space-x-3 text-center">
                <div className="flex flex-col">
                  <span className="text-2xl font-bold" style={{ color: config.buttonBGColor }}>{timeRemaining.days}</span>
                  <span className="text-xs" style={{ color: config.signupTextColor }}>Days</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold" style={{ color: config.buttonBGColor }}>{timeRemaining.hours}</span>
                  <span className="text-xs" style={{ color: config.signupTextColor }}>Hours</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold" style={{ color: config.buttonBGColor }}>{timeRemaining.minutes}</span>
                  <span className="text-xs" style={{ color: config.signupTextColor }}>Minutes</span>
                </div>
              </div>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {config.collectName && (
              <div>
                <Input
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  style={{
                    backgroundColor: config.inputBoxBGColor,
                    borderColor: config.inputBoxBorderColor,
                    borderWidth: config.inputBoxBorderWidth,
                    borderRadius: config.inputBoxBorderRadius
                  }}
                />
              </div>
            )}
            
            <div>
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
            </div>
            
            {config.collectCompany && (
              <div>
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
              </div>
            )}
            
            {/* Custom Fields */}
            {config.customFields.map(field => (
              <div key={field.id}>
                <Input
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
              </div>
            ))}
            
            <div>
              <Button 
                className="w-full" 
                type="submit"
                style={{
                  backgroundColor: config.buttonBGColor,
                  color: config.buttonTextColor,
                  fontWeight: config.buttonTextBold,
                  borderColor: config.buttonBorderColor,
                  borderWidth: config.buttonBorderWidth,
                  borderRadius: config.buttonBorderRadius
                }}
              >
                {config.buttonText}
              </Button>
            </div>
          </form>

          {config.showSocialProof && (
            <div className="flex flex-col items-center space-y-2 mt-4">
              <div className="flex -space-x-2">
                {avatars.map((src, i) => (
                  <Avatar key={i} className="border-2 border-white">
                    <AvatarImage src={src} />
                    <AvatarFallback>{`U${i+1}`}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <p className="text-sm" style={{ color: config.signupTextColor }}>
                {config.showPosition ? `Join ${config.totalSignups} others on the waitlist` : "Be the first to join"}
              </p>
            </div>
          )}

          {config.enableReferrals && (
            <div className="text-center text-sm text-gray-600 flex items-center justify-center">
              <Zap className="h-4 w-4 mr-1" style={{ color: config.pingDotColor }} />
              <span>Skip the queue with referrals</span>
            </div>
          )}
          
          {config.showPosition && !config.showSocialProof && (
            <div className="text-center text-sm text-gray-600">
              <span>Join {config.totalSignups} others on the waitlist</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WidgetPreview;
