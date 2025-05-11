
import { useConfig } from "./contexts/ConfigContext";
import { Input } from "./ui/input";
import { Switch } from "./ui/switch";
import { Separator } from "./ui/separator";
import { Zap } from "lucide-react";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { CardContent } from "./ui/card";

const DesignPanel = () => {
  const { config, updateConfig } = useConfig();

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-6">
          {/* Button Styling */}
          <div className="space-y-4">
            <h3 className="text-md font-medium">Button Styling</h3>

            <div className="space-y-2">
              <Label htmlFor="buttonBGColor">Button Background Color</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="buttonBGColor"
                  type="color"
                  value={config.buttonBGColor}
                  onChange={(e) => updateConfig({ buttonBGColor: e.target.value })}
                  className="w-12 h-10 p-1"
                />
                <Input
                  value={config.buttonBGColor}
                  onChange={(e) => updateConfig({ buttonBGColor: e.target.value })}
                  className="flex-1"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="buttonTextColor">Button Text Color</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="buttonTextColor"
                  type="color"
                  value={config.buttonTextColor}
                  onChange={(e) => updateConfig({ buttonTextColor: e.target.value })}
                  className="w-12 h-10 p-1"
                />
                <Input
                  value={config.buttonTextColor}
                  onChange={(e) => updateConfig({ buttonTextColor: e.target.value })}
                  className="flex-1"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="buttonBorderRadius">Button Border Radius</Label>
              <Input
                id="buttonBorderRadius"
                value={config.buttonBorderRadius}
                onChange={(e) => updateConfig({ buttonBorderRadius: e.target.value })}
                placeholder="0.5rem"
              />
            </div>
          </div>
          
          <Separator />
          
          {/* Input Box Styling */}
          <div className="space-y-4">
            <h3 className="text-md font-medium">Input Box Styling</h3>
            
            <div className="space-y-2">
              <Label htmlFor="inputBoxBGColor">Input Box Background</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="inputBoxBGColor"
                  type="color"
                  value={config.inputBoxBGColor}
                  onChange={(e) => updateConfig({ inputBoxBGColor: e.target.value })}
                  className="w-12 h-10 p-1"
                />
                <Input
                  value={config.inputBoxBGColor}
                  onChange={(e) => updateConfig({ inputBoxBGColor: e.target.value })}
                  className="flex-1"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="inputBoxBorderColor">Input Border Color</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="inputBoxBorderColor"
                  type="color"
                  value={config.inputBoxBorderColor}
                  onChange={(e) => updateConfig({ inputBoxBorderColor: e.target.value })}
                  className="w-12 h-10 p-1"
                />
                <Input
                  value={config.inputBoxBorderColor}
                  onChange={(e) => updateConfig({ inputBoxBorderColor: e.target.value })}
                  className="flex-1"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="inputBoxBorderWidth">Input Border Width</Label>
              <Input
                id="inputBoxBorderWidth"
                value={config.inputBoxBorderWidth}
                onChange={(e) => updateConfig({ inputBoxBorderWidth: e.target.value })}
                placeholder="1px"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="inputBoxBorderRadius">Input Border Radius</Label>
              <Input
                id="inputBoxBorderRadius"
                value={config.inputBoxBorderRadius}
                onChange={(e) => updateConfig({ inputBoxBorderRadius: e.target.value })}
                placeholder="0.5rem"
              />
            </div>
          </div>
          
          <Separator />
          
          {/* Text Colors */}
          <div className="space-y-4">
            <h3 className="text-md font-medium">Text Colors</h3>
            
            <div className="space-y-2">
              <Label htmlFor="signupTextColor">Text Color</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="signupTextColor"
                  type="color"
                  value={config.signupTextColor}
                  onChange={(e) => updateConfig({ signupTextColor: e.target.value })}
                  className="w-12 h-10 p-1"
                />
                <Input
                  value={config.signupTextColor}
                  onChange={(e) => updateConfig({ signupTextColor: e.target.value })}
                  className="flex-1"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="pingDotColor">Accent Color</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="pingDotColor"
                  type="color"
                  value={config.pingDotColor}
                  onChange={(e) => updateConfig({ pingDotColor: e.target.value })}
                  className="w-12 h-10 p-1"
                />
                <Input
                  value={config.pingDotColor}
                  onChange={(e) => updateConfig({ pingDotColor: e.target.value })}
                  className="flex-1"
                />
              </div>
            </div>
          </div>
          
          <Separator />
          
          {/* Additional Design Settings */}
          <div className="space-y-4">
            <h3 className="text-md font-medium">Additional Settings</h3>
            
            <div className="space-y-2">
              <Label htmlFor="refBackgroundColor">Referral Background</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="refBackgroundColor"
                  type="color"
                  value={config.refBackgroundColor}
                  onChange={(e) => updateConfig({ refBackgroundColor: e.target.value })}
                  className="w-12 h-10 p-1"
                />
                <Input
                  value={config.refBackgroundColor}
                  onChange={(e) => updateConfig({ refBackgroundColor: e.target.value })}
                  className="flex-1"
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DesignPanel;
