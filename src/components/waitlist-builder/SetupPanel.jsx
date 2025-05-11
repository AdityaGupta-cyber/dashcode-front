
import { useConfig } from "./contexts/ConfigContext";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Switch } from "./ui/switch";
import { Separator } from "./ui/separator";

import { Zap, TrendingUp, Check } from "lucide-react";
import { Card } from "./ui/card";
import { CardContent } from "./ui/card";
import { Select } from "./ui/select";
import { SelectContent } from "./ui/select";
import { SelectItem } from "./ui/select";
import { SelectTrigger } from "./ui/select";
import { SelectValue } from "./ui/select";

const SetupPanel = () => {
  const { config, updateConfig } = useConfig();

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Project Title</Label>
              <Input
                id="title"
                value={config.title}
                onChange={(e) => updateConfig({ title: e.target.value })}
                placeholder="Enter your project title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="placeholderText">Placeholder Input Text</Label>
              <Input
                id="placeholderText"
                value={config.placeholderText}
                onChange={(e) => updateConfig({ placeholderText: e.target.value })}
                placeholder="Enter placeholder text"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="buttonText">Button Text</Label>
              <Input
                id="buttonText"
                value={config.buttonText}
                onChange={(e) => updateConfig({ buttonText: e.target.value })}
                placeholder="Enter button text"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="successMessage">Success Message</Label>
              <Input
                id="successMessage"
                value={config.successMessage}
                onChange={(e) => updateConfig({ successMessage: e.target.value })}
                placeholder="Enter success message"
              />
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="showLogo" className="cursor-pointer">Show Logo</Label>
              <Switch
                id="showLogo"
                checked={config.showLogo}
                onCheckedChange={(checked) => updateConfig({ showLogo: checked })}
              />
            </div>

            {config.showLogo && (
              <div className="space-y-2">
                <Label htmlFor="logoSize">Logo Size</Label>
                <Select
                  value={config.logoSize.toString()}
                  onValueChange={(value) => updateConfig({ logoSize: parseFloat(value) })}
                >
                  <SelectTrigger id="logoSize">
                    <SelectValue placeholder="Select logo size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0.75">0.75x</SelectItem>
                    <SelectItem value="1">1x</SelectItem>
                    <SelectItem value="1.25">1.25x</SelectItem>
                    <SelectItem value="1.5">1.5x</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Label htmlFor="showSocialProof" className="cursor-pointer mr-2">
                  Show Social Proof
                </Label>
                <Zap className="h-4 w-4 text-purple-500" />
              </div>
              <Switch
                id="showSocialProof"
                checked={config.showSocialProof}
                onCheckedChange={(checked) => updateConfig({ showSocialProof: checked })}
              />
            </div>
          </div>
          
          <Separator />
          
          {/* Position & Progress Features */}
          <div className="space-y-4">
            <h3 className="text-md font-medium">Position & Progress Features</h3>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Label htmlFor="showPosition" className="cursor-pointer mr-2">
                  Show Signup Position
                </Label>
                <TrendingUp className="h-4 w-4 text-purple-500" />
              </div>
              <Switch
                id="showPosition"
                checked={config.showPosition}
                onCheckedChange={(checked) => updateConfig({ showPosition: checked })}
              />
            </div>
            
            {config.showPosition && (
              <div className="space-y-2 pl-4 border-l-2 border-purple-100">
                {/* For demo purposes */}
                <div className="flex items-center justify-between">
                  <Label htmlFor="currentPosition">Current Position (Demo)</Label>
                  <Input
                    id="currentPosition"
                    type="number"
                    value={config.currentPosition}
                    onChange={(e) => updateConfig({ currentPosition: parseInt(e.target.value) })}
                    className="w-20"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="totalSignups">Total Signups (Demo)</Label>
                  <Input
                    id="totalSignups"
                    type="number"
                    value={config.totalSignups}
                    onChange={(e) => updateConfig({ totalSignups: parseInt(e.target.value) })}
                    className="w-20"
                  />
                </div>
              </div>
            )}
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Label htmlFor="showProgressCount" className="cursor-pointer mr-2">
                  Show Progress Updates
                </Label>
                <Check className="h-4 w-4 text-purple-500" />
              </div>
              <Switch
                id="showProgressCount"
                checked={config.showProgressCount}
                onCheckedChange={(checked) => updateConfig({ showProgressCount: checked })}
              />
            </div>
            
            {config.showProgressCount && (
              <div className="space-y-2 pl-4 border-l-2 border-purple-100">
                <Label htmlFor="progressUpdateFrequency">Update Frequency</Label>
                <Select
                  value={config.progressUpdateFrequency}
                  onValueChange={(value) => updateConfig({ 
                    progressUpdateFrequency: value 
                  })}
                >
                  <SelectTrigger id="progressUpdateFrequency">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SetupPanel;
