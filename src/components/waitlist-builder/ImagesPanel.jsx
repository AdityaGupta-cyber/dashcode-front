
import { Upload, Image } from "lucide-react";
import { useConfig } from "./contexts/ConfigContext";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Slider } from "./ui/slider";
import { Card } from "./ui/card";
import { CardContent } from "./ui/card";

const ImagesPanel = () => {
  const { config, updateConfig } = useConfig();

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-6">
          {/* Logo URL */}
          <div className="space-y-4">
            <h3 className="text-md font-medium flex items-center gap-2">
              <Image className="h-5 w-5" />
              Logo
            </h3>
            
            <div className="space-y-2">
              <Label htmlFor="logoUrl">Logo URL</Label>
              <Input
                id="logoUrl"
                placeholder="https://example.com/logo.png"
                value={config.logoUrl}
                onChange={(e) => updateConfig({ logoUrl: e.target.value })}
              />
              <p className="text-sm text-gray-500">
                Enter a URL for your logo image. PNG or SVG recommended.
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="logoSize">Logo Size</Label>
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
            </div>
          </div>
          
          {/* Background URL */}
          <div className="space-y-4">
            <h3 className="text-md font-medium flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Background
            </h3>
            
            <div className="space-y-2">
              <Label htmlFor="backgroundUrl">Background Image URL</Label>
              <Input
                id="backgroundUrl"
                placeholder="https://example.com/background.jpg"
                value={config.backgroundUrl}
                onChange={(e) => updateConfig({ backgroundUrl: e.target.value })}
              />
              <p className="text-sm text-gray-500">
                Enter a URL for your background image. High-quality JPG recommended.
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="backgroundOpacity">Background Overlay Opacity</Label>
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
                  updateConfig({ 
                    backgroundOpacity: opacity,
                    backgroundOverlay: `rgba(0, 0, 0, ${opacity})`
                  });
                }}
              />
              <p className="text-sm text-gray-500">
                Adjust the dark overlay on top of your background image.
              </p>
            </div>
          </div>
          
          {/* Background Overlay Color */}
          <div className="space-y-2">
            <Label htmlFor="backgroundOverlayColor">Background Overlay Color</Label>
            <div className="flex items-center gap-2">
              <Input
                id="backgroundOverlayColor"
                type="color"
                value="#000000"
                onChange={(e) => {
                  const color = e.target.value;
                  const rgba = `rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)}, ${config.backgroundOpacity})`;
                  updateConfig({ backgroundOverlay: rgba });
                }}
                className="w-12 h-10 p-1"
              />
              <div className="flex-1 text-sm text-gray-500">
                Choose the color of the overlay that appears on top of your background image
              </div>
            </div>
          </div>

          {/* Preview Example */}
          <div className="mt-4 p-4 border rounded-lg">
            <h4 className="text-sm font-medium mb-2">Tips:</h4>
            <ul className="text-sm text-gray-500 space-y-2 list-disc pl-4">
              <li>Use consistent branding across your logo and color scheme</li>
              <li>For backgrounds, try subtle patterns or blurred abstract images</li>
              <li>Make sure there's enough contrast between text and background</li>
              <li>Consider a transparent logo (PNG) to work with different backgrounds</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImagesPanel;
