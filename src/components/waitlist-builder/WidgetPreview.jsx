import { useConfig } from "./contexts/ConfigContext";
// import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Zap, TrendingUp, Check, Upload, Heart } from "lucide-react";
import { useState } from "react";
import { Progress } from "./ui/progress";
import { AnimatedTooltip } from "./ui/animated-tooltip";

const WidgetPreview = () => {
  const { config } = useConfig();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [customFieldValues, setCustomFieldValues] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showReferral, setShowReferral] = useState(false);
  console.log(`buttonBGColor: ${config.buttonBGColor}                                                    `)
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
  const people = [
    {
      id: 1,
      name: "John Doe",
      designation: "Software Engineer",
      image:
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
    },
    {
      id: 2,
      name: "Robert Johnson",
      designation: "Product Manager",
      image:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 3,
      name: "Jane Smith",
      designation: "Data Scientist",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 4,
      name: "Emily Davis",
      designation: "UX Designer",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    }
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
      className="w-full max-w-md mx-auto border border-gray-200 rounded-3xl overflow-hidden"
      style={{
        ...backgroundStyle,
        position: 'relative',
      }}
    >
      <div className="p-8">
        {submitted ? (
          <div className="text-center py-8">
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
            
            <button 
              className="text-blue-500 hover:text-blue-700 text-sm mt-6"
              onClick={resetForm}
            >
              Reset demo
            </button>
          </div>
        ) : showReferral ? (
          <div className="space-y-6 p-6 border rounded-lg" style={{ backgroundColor: config.refBackgroundColor }}>
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
              <div className="flex justify-center mb-6">
                {config.logoUrl ? (
                  <img 
                    src={config.logoUrl} 
                    alt="Logo" 
                    className="h-16 w-auto" 
                    style={{ transform: `scale(${config.logoSize})` }}
                  />
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
                className="text-3xl font-bold mb-3"
                style={{ color: config.signupTextColor }}
              >
                {config.title}
              </h2>
              
              <p 
                className="text-gray-600 mb-6 mx-auto max-w-sm"
                style={{ color: `${config.signupTextColor}99` }} // 60% opacity version of text color
              >
                {config.description || "Updates, news, exclusive discounts, and so much more cool stuff happens behind-the-scenes"}
              </p>
            </div>
            
            {config.showCountdown && timeRemaining.total > 0 && (
              <div className="mb-6 p-3 bg-gray-50 rounded-lg text-center">
                <p className="text-sm font-medium mb-2">Launching in:</p>
                <div className="flex justify-center gap-3">
                  <div className="text-center">
                    <div className="text-xl font-bold">{timeRemaining.days}</div>
                    <div className="text-xs text-gray-500">days</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold">{timeRemaining.hours}</div>
                    <div className="text-xs text-gray-500">hours</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold">{timeRemaining.minutes}</div>
                    <div className="text-xs text-gray-500">mins</div>
                  </div>
                </div>
              </div>
            )}
            
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
                    {config.totalSignups > 0 ? `Be the first to join` : "Be the first to join"}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* White Label Footer - Only show if not disabled */}
      {!config.whiteLabel && (
        <div className={`py-2 px-3 ${config.buttonTextColor} text-xs flex items-center justify-end`}>
          <span>made with</span>
          <Heart className="h-3 w-3 text-purple-400 mx-1 fill-current" />
          <span>by</span>
          <a href="#" className={`font-medium ml-1 ${config.buttonTextColor}`}>Ather</a>
        </div>
      )}
    </div>
  );
};

export default WidgetPreview;
