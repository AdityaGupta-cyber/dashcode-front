import { Upload, Image, Palette, FileImage, Sliders, Info } from "lucide-react";
import { useConfig } from "./contexts/ConfigContext";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Slider } from "./ui/slider";
import { Card } from "./ui/card";
import { CardContent } from "./ui/card";
import { Separator } from "./ui/separator";
import { Switch } from "./ui/switch";

const ImagesPanel = () => {
  const { config, updateConfig } = useConfig();

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-8">
          {/* Logo Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Image className="h-5 w-5 text-purple-500" />
              <h3 className="text-lg font-medium">Logo</h3>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border hover:border-gray-300 transition-colors">
              <div className="space-y-0.5">
                <Label htmlFor="showLogo" className="font-medium">Show Logo</Label>
                <p className="text-sm text-gray-500">
                  Display your brand logo at the top of the form
                </p>
              </div>
              <Switch
                id="showLogo"
                checked={config.showLogo}
                onCheckedChange={(checked) => updateConfig({ showLogo: checked })}
              />
            </div>
            
            {config.showLogo && (
              <div className="p-4 bg-gray-50 rounded-lg border space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="logoUrl" className="font-medium">Logo URL</Label>
                  <Input
                    id="logoUrl"
                    placeholder="https://example.com/logo.png"
                    value={config.logoUrl}
                    onChange={(e) => updateConfig({ logoUrl: e.target.value })}
                    className="bg-white"
                  />
                  <p className="text-sm text-gray-500">
                    Enter a URL for your logo image. PNG or SVG recommended.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="logoSize" className="font-medium">Logo Size</Label>
                    <span className="text-sm text-gray-500">{config.logoSize}x</span>
                  </div>
                  <Slider
                    id="logoSize"
                    min={0.5}
                    max={2}
                    step={0.1}
                    value={[config.logoSize]}
                    onValueChange={(value) => updateConfig({ logoSize: value[0] })}
                  />
                  <p className="text-sm text-gray-500">
                    Adjust the size of your logo
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="logoBorderRadius" className="font-medium">Logo Border Radius</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="logoBorderRadius"
                      type="number"
                      min="0"
                      max="50"
                      value={parseInt(config.logoBorderRadius || "0")}
                      onChange={(e) => updateConfig({ logoBorderRadius: `${e.target.value}%` })}
                      className="w-20 bg-white"
                    />
                    <span className="text-sm text-gray-500">%</span>
                    <div className="flex-1">
                      <Slider
                        min={0}
                        max={50}
                        step={1}
                        value={[parseInt(config.logoBorderRadius || "0")]}
                        onValueChange={(value) => updateConfig({ logoBorderRadius: `${value[0]}%` })}
                      />
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">
                    Adjust the roundness of your logo (50% for a perfect circle)
                  </p>
                </div>
              </div>
            )}
          </div>
          
          <Separator />
          
          {/* Background Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <FileImage className="h-5 w-5 text-indigo-500" />
              <h3 className="text-lg font-medium">Background</h3>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="backgroundUrl" className="font-medium">Background Image URL</Label>
              <Input
                id="backgroundUrl"
                placeholder="https://example.com/background.jpg"
                value={config.backgroundUrl}
                onChange={(e) => updateConfig({ backgroundUrl: e.target.value })}
                className="bg-white"
              />
              <p className="text-sm text-gray-500">
                Enter a URL for your background image. High-quality JPG recommended.
              </p>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg border space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="backgroundOpacity" className="font-medium">Background Overlay Opacity</Label>
                  <span className="text-sm text-gray-500">{config.backgroundOpacity * 100}%</span>
                </div>
                <Slider
                  id="backgroundOpacity"
                  min={0}
                  max={1}
                  step={0.05}
                  value={[config.backgroundOpacity]}
                  onValueChange={(value) => {
                    const opacity = value[0];
                    const currentOverlay = config.backgroundOverlay || "rgba(0, 0, 0, 0.5)";
                    const rgbaValues = currentOverlay.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([.\d]+))?\)/);
                    
                    if (rgbaValues) {
                      const [_, r, g, b] = rgbaValues;
                      updateConfig({ 
                        backgroundOpacity: opacity,
                        backgroundOverlay: `rgba(${r}, ${g}, ${b}, ${opacity})`
                      });
                    } else {
                      updateConfig({ 
                        backgroundOpacity: opacity,
                        backgroundOverlay: `rgba(0, 0, 0, ${opacity})`
                      });
                    }
                  }}
                />
                <p className="text-sm text-gray-500">
                  Adjust the opacity of the overlay on top of your background image
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="backgroundOverlayColor" className="font-medium">Background Overlay Color</Label>
                <div className="flex items-center gap-3">
                  <Input
                    id="backgroundOverlayColor"
                    type="color"
                    value={getColorFromRgba(config.backgroundOverlay)}
                    onChange={(e) => {
                      const color = e.target.value;
                      const r = parseInt(color.slice(1, 3), 16);
                      const g = parseInt(color.slice(3, 5), 16);
                      const b = parseInt(color.slice(5, 7), 16);
                      const rgba = `rgba(${r}, ${g}, ${b}, ${config.backgroundOpacity})`;
                      updateConfig({ backgroundOverlay: rgba });
                    }}
                    className="w-12 h-10 p-1"
                  />
                  <p className="text-sm text-gray-500 flex-1">
                    Choose the color of the overlay that appears on top of your background image
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <Separator />
          
          {/* Tips Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Info className="h-5 w-5 text-teal-500" />
              <h3 className="text-lg font-medium">Design Tips</h3>
            </div>
            
            <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
              <ul className="text-sm text-gray-700 space-y-2 list-disc pl-4">
                <li>Use consistent branding across your logo and color scheme</li>
                <li>For backgrounds, try subtle patterns or blurred abstract images</li>
                <li>Make sure there's enough contrast between text and background</li>
                <li>Consider a transparent logo (PNG) to work with different backgrounds</li>
                <li>Test your design on both light and dark backgrounds</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Helper function to extract hex color from rgba string
function getColorFromRgba(rgba) {
  if (!rgba) return "#000000";
  
  const match = rgba.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([.\d]+))?\)/);
  if (!match) return "#000000";
  
  const [_, r, g, b] = match;
  return `#${parseInt(r).toString(16).padStart(2, '0')}${parseInt(g).toString(16).padStart(2, '0')}${parseInt(b).toString(16).padStart(2, '0')}`;
}

export default ImagesPanel;
