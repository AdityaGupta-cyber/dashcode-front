import { Zap, Check } from "lucide-react";
import { CardContent } from "./ui/card";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { Switch } from "./ui/switch";
import { Card } from "./ui/card";import { useConfig } from "./contexts/ConfigContext";
import { Button } from "./ui/button";

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
        refBackgroundColor: "#FFFFFF"
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
        refBackgroundColor: "#F1F0FB"
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
        refBackgroundColor: "#FDF2F8"
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
        refBackgroundColor: "#F2FCE2"
      }
    }
  ];
  
  const applyTheme = (theme: any) => {
    updateConfig({ ...theme.colors });
  };
  
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-md font-medium mb-4">Preset Themes</h3>
            <div className="grid grid-cols-2 gap-3">
              {themes.map((theme, index) => (
                <div 
                  key={index}
                  className="border rounded-md p-3 cursor-pointer hover:border-primary"
                  onClick={() => applyTheme(theme)}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{theme.name}</span>
                    <div
                      className="w-5 h-5 rounded-full"
                      style={{ backgroundColor: theme.colors.buttonBGColor }}
                    ></div>
                  </div>
                  <div className="flex gap-2 mt-2">
                    {Object.entries(theme.colors).slice(0, 3).map(([key, color], i) => (
                      <div
                        key={i}
                        className="w-4 h-4 rounded-full border"
                        style={{ backgroundColor: color as string }}
                      ></div>
                    ))}
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="w-full mt-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      applyTheme(theme);
                    }}
                  >
                    Apply
                  </Button>
                </div>
              ))}
            </div>
          </div>
          
          <Separator />
          
          {/* Advanced Features */}
          <div className="space-y-4">
            <h3 className="text-md font-medium">Advanced Features</h3>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Label htmlFor="enableReferrals" className="cursor-pointer mr-2">
                  Enable Referrals
                </Label>
                <Zap className="h-4 w-4 text-purple-500" />
              </div>
              <Switch
                id="enableReferrals"
                checked={config.enableReferrals}
                onCheckedChange={(checked) => updateConfig({ enableReferrals: checked })}
              />
            </div>
            
            {config.enableReferrals && (
              <div className="space-y-2 pl-4 border-l-2 border-purple-100">
                <div className="flex items-center">
                  <Label htmlFor="positionsToSkip" className="cursor-pointer mr-2">
                    Positions to Skip on Referral
                  </Label>
                  <Check className="h-4 w-4 text-purple-500" />
                </div>
                <input
                  id="positionsToSkip"
                  type="number"
                  min="1"
                  max="10"
                  value={config.positionsToSkip}
                  onChange={(e) => updateConfig({ positionsToSkip: parseInt(e.target.value) })}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
            )}
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Label htmlFor="whiteLabel" className="cursor-pointer mr-2">
                  White Label
                </Label>
                <Zap className="h-4 w-4 text-purple-500" />
              </div>
              <Switch
                id="whiteLabel"
                checked={config.whiteLabel}
                onCheckedChange={(checked) => updateConfig({ whiteLabel: checked })}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Label htmlFor="enableEmailVerification" className="cursor-pointer mr-2">
                  Email Verification
                </Label>
                <Zap className="h-4 w-4 text-purple-500" />
              </div>
              <Switch
                id="enableEmailVerification"
                checked={config.enableEmailVerification}
                onCheckedChange={(checked) => updateConfig({ enableEmailVerification: checked })}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ThemesPanel;
