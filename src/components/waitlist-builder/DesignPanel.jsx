import { useConfig } from "./contexts/ConfigContext";
import { Input } from "./ui/input";
import { Switch } from "./ui/switch";
import { Separator } from "./ui/separator";
import { Palette, Sliders, Type, Brush, Layers } from "lucide-react";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { CardContent } from "./ui/card";
import { Slider } from "./ui/slider";

const DesignPanel = () => {
  const { config, updateConfig } = useConfig();

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-8">
          {/* Button Styling */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Sliders className="h-5 w-5 text-indigo-500" />
              <h3 className="text-lg font-medium">Button Styling</h3>
            </div>

            <div className="space-y-2">
              <Label htmlFor="buttonBGColor" className="font-medium">Button Background Color</Label>
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
              <p className="text-sm text-gray-500">
                The main color for your call-to-action button
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="buttonTextColor" className="font-medium">Button Text Color</Label>
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
              <p className="text-sm text-gray-500">
                The color of text inside your button
              </p>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border hover:border-gray-300 transition-colors">
              <div className="space-y-0.5">
                <Label htmlFor="buttonTextBold" className="font-medium">Bold Button Text</Label>
                <p className="text-sm text-gray-500">
                  Make the button text bold for more emphasis
                </p>
              </div>
              <Switch
                id="buttonTextBold"
                checked={config.buttonTextBold === "700"}
                onCheckedChange={(checked) => updateConfig({ buttonTextBold: checked ? "700" : "400" })}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="buttonBorderRadius" className="font-medium">Button Border Radius</Label>
                <span className="text-sm text-gray-500">{config.buttonBorderRadius}</span>
              </div>
              <Slider
                id="buttonBorderRadius"
                min={0}
                max={20}
                step={0.5}
                value={[parseFloat(config.buttonBorderRadius) || 0.5]}
                onValueChange={(value) => updateConfig({ buttonBorderRadius: `${value[0]}rem` })}
              />
              <p className="text-sm text-gray-500">
                Controls how rounded the button corners are
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="buttonBorderColor" className="font-medium">Button Border Color</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="buttonBorderColor"
                  type="color"
                  value={config.buttonBorderColor}
                  onChange={(e) => updateConfig({ buttonBorderColor: e.target.value })}
                  className="w-12 h-10 p-1"
                />
                <Input
                  value={config.buttonBorderColor}
                  onChange={(e) => updateConfig({ buttonBorderColor: e.target.value })}
                  className="flex-1"
                />
              </div>
              <p className="text-sm text-gray-500">
                The color of the button border (if width is greater than 0)
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="buttonBorderWidth" className="font-medium">Button Border Width</Label>
                <span className="text-sm text-gray-500">{config.buttonBorderWidth}</span>
              </div>
              <Slider
                id="buttonBorderWidth"
                min={0}
                max={5}
                step={1}
                value={[parseInt(config.buttonBorderWidth) || 0]}
                onValueChange={(value) => updateConfig({ buttonBorderWidth: `${value[0]}px` })}
              />
              <p className="text-sm text-gray-500">
                The thickness of the button border (0 for no border)
              </p>
            </div>
          </div>
          
          <Separator />
          
          {/* Input Box Styling */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Type className="h-5 w-5 text-blue-500" />
              <h3 className="text-lg font-medium">Input Box Styling</h3>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="inputBoxBGColor" className="font-medium">Input Box Background</Label>
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
              <p className="text-sm text-gray-500">
                The background color of your input fields
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="inputBoxBorderColor" className="font-medium">Input Border Color</Label>
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
              <p className="text-sm text-gray-500">
                The color of the border around input fields
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="inputBoxBorderWidth" className="font-medium">Input Border Width</Label>
                <span className="text-sm text-gray-500">{config.inputBoxBorderWidth}</span>
              </div>
              <Slider
                id="inputBoxBorderWidth"
                min={0}
                max={5}
                step={1}
                value={[parseInt(config.inputBoxBorderWidth) || 1]}
                onValueChange={(value) => updateConfig({ inputBoxBorderWidth: `${value[0]}px` })}
              />
              <p className="text-sm text-gray-500">
                The thickness of the input field borders
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="inputBoxBorderRadius" className="font-medium">Input Border Radius</Label>
                <span className="text-sm text-gray-500">{config.inputBoxBorderRadius}</span>
              </div>
              <Slider
                id="inputBoxBorderRadius"
                min={0}
                max={20}
                step={0.5}
                value={[parseFloat(config.inputBoxBorderRadius) || 0.5]}
                onValueChange={(value) => updateConfig({ inputBoxBorderRadius: `${value[0]}rem` })}
              />
              <p className="text-sm text-gray-500">
                Controls how rounded the input field corners are
              </p>
            </div>
          </div>
          
          <Separator />
          
          {/* Text Colors */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Palette className="h-5 w-5 text-rose-500" />
              <h3 className="text-lg font-medium">Text Colors</h3>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="signupTextColor" className="font-medium">Main Text Color</Label>
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
              <p className="text-sm text-gray-500">
                The primary color for text in your waitlist form
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="pingDotColor" className="font-medium">Accent Color</Label>
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
              <p className="text-sm text-gray-500">
                Used for highlights, indicators, and accent elements
              </p>
            </div>
          </div>
          
          <Separator />
          
          {/* Additional Design Settings */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Brush className="h-5 w-5 text-amber-500" />
              <h3 className="text-lg font-medium">Additional Settings</h3>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="refBackgroundColor" className="font-medium">Referral Background</Label>
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
              <p className="text-sm text-gray-500">
                Background color for the referral screen
              </p>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border hover:border-gray-300 transition-colors">
              <div className="space-y-0.5">
                <Label htmlFor="whiteLabel" className="font-medium">White Label</Label>
                <p className="text-sm text-gray-500">
                  Remove "Made with ❤️ by Ather" from the footer
                </p>
              </div>
              <Switch
                id="whiteLabel"
                checked={config.whiteLabel}
                onCheckedChange={(checked) => updateConfig({ whiteLabel: checked })}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DesignPanel;
