import { Zap, Check, Palette, Sparkles, Layers, Settings } from "lucide-react";
import { CardContent } from "./ui/card";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { Switch } from "./ui/switch";
import { Card } from "./ui/card";
import { useConfig } from "./contexts/ConfigContext";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";

const ThemesPanel = () => {
  const { config, updateConfig } = useConfig();
  
  // Predefined theme color sets
  const themes = [
    {
      name: "Purple Passion",
      colors: {
        buttonBGColor: "#9333ea",
        buttonTextColor: "#FFFFFF",
        inputBoxBorderColor: "#DCDCDC",
        pingDotColor: "#9333ea",
        signupTextColor: "#0A0A0A",
        refBackgroundColor: "#FFFFFF",
        titleColor: "#0A0A0A",
        descriptionColor: "#6B7280"
      }
    },
    {
      name: "Ocean Blue",
      colors: {
        buttonBGColor: "#0EA5E9",
        buttonTextColor: "#FFFFFF",
        inputBoxBorderColor: "#D3E4FD",
        pingDotColor: "#0EA5E9",
        signupTextColor: "#1A1F2C",
        refBackgroundColor: "#F1F0FB",
        titleColor: "#1A1F2C",
        descriptionColor: "#64748B"
      }
    },
    {
      name: "Sunset Orange",
      colors: {
        buttonBGColor: "#F97316",
        buttonTextColor: "#FFFFFF",
        inputBoxBorderColor: "#FDE1D3",
        pingDotColor: "#F97316",
        signupTextColor: "#403E43",
        refBackgroundColor: "#FDF2F8",
        titleColor: "#403E43",
        descriptionColor: "#71717A"
      }
    },
    {
      name: "Green Nature",
      colors: {
        buttonBGColor: "#10B981",
        buttonTextColor: "#FFFFFF",
        inputBoxBorderColor: "#D1FAE5",
        pingDotColor: "#10B981",
        signupTextColor: "#1F2937",
        refBackgroundColor: "#F2FCE2",
        titleColor: "#1F2937",
        descriptionColor: "#4B5563"
      }
    }
  ];
  
  const applyTheme = (theme) => {
    updateConfig({ ...theme.colors });
  };
  
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-8">
          {/* Preset Themes Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Palette className="h-5 w-5 text-pink-500" />
              <h3 className="text-lg font-medium">Preset Themes</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {themes.map((theme, index) => (
                <div 
                  key={index}
                  className="border rounded-lg p-4 cursor-pointer hover:border-primary hover:shadow-sm transition-all"
                  onClick={() => applyTheme(theme)}
                >
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-medium">{theme.name}</span>
                    <div
                      className="w-6 h-6 rounded-full border shadow-sm"
                      style={{ backgroundColor: theme.colors.buttonBGColor }}
                    ></div>
                  </div>
                  
                  <div className="flex gap-2 mb-3">
                    {Object.entries(theme.colors).slice(0, 4).map(([key, color], i) => (
                      <div
                        key={i}
                        className="w-5 h-5 rounded-full border shadow-sm"
                        style={{ backgroundColor: color }}
                        title={key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      ></div>
                    ))}
                  </div>
                  
                  <Button 
                    size="sm" 
                    className="w-full text-white"
                    style={{ backgroundColor: theme.colors.buttonBGColor }}
                    onClick={(e) => {
                      e.stopPropagation();
                      applyTheme(theme);
                    }}
                  >
                    Apply Theme
                  </Button>
                </div>
              ))}
            </div>
          </div>
          
          <Separator />
          
          {/* Advanced Features */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-5 w-5 text-amber-500" />
              <h3 className="text-lg font-medium">Advanced Features</h3>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border hover:border-gray-300 transition-colors">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <Label htmlFor="enableReferrals" className="font-medium">Enable Referrals</Label>
                  <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">PRO</Badge>
                </div>
                <p className="text-sm text-gray-500">
                  Allow users to skip the queue by referring friends
                </p>
              </div>
              <Switch
                id="enableReferrals"
                checked={config.enableReferrals}
                onCheckedChange={(checked) => updateConfig({ enableReferrals: checked })}
              />
            </div>
            
            {config.enableReferrals && (
              <div className="p-4 bg-gray-50 rounded-lg border space-y-4 ml-4 border-l-4 border-l-purple-200">
                <div className="space-y-2">
                  <Label htmlFor="positionsToSkip" className="font-medium">Positions to Skip on Referral</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="positionsToSkip"
                      type="number"
                      min="1"
                      max="10"
                      value={config.positionsToSkip}
                      onChange={(e) => updateConfig({ positionsToSkip: parseInt(e.target.value) })}
                      className="w-20 bg-white"
                    />
                    <span className="text-sm text-gray-500">positions</span>
                  </div>
                  <p className="text-sm text-gray-500">
                    Number of positions a user will skip for each successful referral
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="referralMessage" className="font-medium">Referral Message</Label>
                  <Input
                    id="referralMessage"
                    value={config.referralMessage || "Share this link with friends to move up in the waitlist!"}
                    onChange={(e) => updateConfig({ referralMessage: e.target.value })}
                    className="bg-white"
                  />
                  <p className="text-sm text-gray-500">
                    Message shown to users when they get their referral link
                  </p>
                </div>
              </div>
            )}
            
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border hover:border-gray-300 transition-colors">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <Label htmlFor="whiteLabel" className="font-medium">White Label</Label>
                  <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">PRO</Badge>
                </div>
                <p className="text-sm text-gray-500">
                  Remove "Made with ❤️ by Ather" from the waitlist form
                </p>
              </div>
              <Switch
                id="whiteLabel"
                checked={config.whiteLabel}
                onCheckedChange={(checked) => updateConfig({ whiteLabel: checked })}
              />
            </div>
            
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border hover:border-gray-300 transition-colors">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <Label htmlFor="enableEmailVerification" className="font-medium">Email Verification</Label>
                  <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">PRO</Badge>
                </div>
                <p className="text-sm text-gray-500">
                  Send verification emails to confirm user sign-ups
                </p>
              </div>
              <Switch
                id="enableEmailVerification"
                checked={config.enableEmailVerification}
                onCheckedChange={(checked) => updateConfig({ enableEmailVerification: checked })}
              />
            </div>
            
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border hover:border-gray-300 transition-colors">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <Label htmlFor="enableCaptcha" className="font-medium">CAPTCHA Protection</Label>
                  <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">PRO</Badge>
                </div>
                <p className="text-sm text-gray-500">
                  Protect your waitlist from bots and spam submissions
                </p>
              </div>
              <Switch
                id="enableCaptcha"
                checked={config.enableCaptcha}
                onCheckedChange={(checked) => updateConfig({ enableCaptcha: checked })}
              />
            </div>
          </div>
          
          <Separator />
          
          {/* Analytics & Tracking */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Layers className="h-5 w-5 text-blue-500" />
              <h3 className="text-lg font-medium">Analytics & Tracking</h3>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border hover:border-gray-300 transition-colors">
              <div className="space-y-0.5">
                <Label htmlFor="showProgressCount" className="font-medium">Show Progress Count</Label>
                <p className="text-sm text-gray-500">
                  Display the total number of signups on your waitlist
                </p>
              </div>
              <Switch
                id="showProgressCount"
                checked={config.showProgressCount}
                onCheckedChange={(checked) => updateConfig({ showProgressCount: checked })}
              />
            </div>
            
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border hover:border-gray-300 transition-colors">
              <div className="space-y-0.5">
                <Label htmlFor="showPosition" className="font-medium">Show Position</Label>
                <p className="text-sm text-gray-500">
                  Show users their position in the waitlist
                </p>
              </div>
              <Switch
                id="showPosition"
                checked={config.showPosition}
                onCheckedChange={(checked) => updateConfig({ showPosition: checked })}
              />
            </div>
            
            {config.showProgressCount && (
              <div className="p-4 bg-gray-50 rounded-lg border space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="progressUpdateFrequency" className="font-medium">Progress Update Frequency</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {["daily", "weekly", "monthly"].map((frequency) => (
                      <Button
                        key={frequency}
                        type="button"
                        variant={config.progressUpdateFrequency === frequency ? "default" : "outline"}
                        className="capitalize"
                        onClick={() => updateConfig({ progressUpdateFrequency: frequency })}
                      >
                        {frequency}
                      </Button>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500">
                    How often to send progress updates to users
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ThemesPanel;
