import { useConfig } from "./contexts/ConfigContext";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Switch } from "./ui/switch";
import { Separator } from "./ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card } from "./ui/card";
import { CardContent } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Settings, Type, MessageSquare, CheckCircle, Users, Bell } from "lucide-react";

const SetupPanel = () => {
  const { config, updateConfig } = useConfig();

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-8">
          {/* Title & Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Type className="h-5 w-5 text-purple-500" />
              <h3 className="text-lg font-medium">Title & Description</h3>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title" className="font-medium">Title</Label>
              <Input
                id="title"
                value={config.title}
                onChange={(e) => updateConfig({ title: e.target.value })}
                placeholder="Enter title"
              />
              <p className="text-sm text-gray-500">
                The main heading for your waitlist form
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="titleColor" className="font-medium">Title Color</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="titleColor"
                  type="color"
                  value={config.titleColor || config.signupTextColor}
                  onChange={(e) => updateConfig({ titleColor: e.target.value })}
                  className="w-12 h-10 p-1"
                />
                <Input
                  value={config.titleColor || config.signupTextColor}
                  onChange={(e) => updateConfig({ titleColor: e.target.value })}
                  className="flex-1"
                />
              </div>
              <p className="text-sm text-gray-500">
                Choose a color that stands out against your background
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="titleSize" className="font-medium">Title Size</Label>
              <Select
                value={config.titleSize || "3xl"}
                onValueChange={(value) => updateConfig({ titleSize: value })}
              >
                <SelectTrigger id="titleSize">
                  <SelectValue placeholder="Select title size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="xl">Small</SelectItem>
                  <SelectItem value="2xl">Medium</SelectItem>
                  <SelectItem value="3xl">Large</SelectItem>
                  <SelectItem value="4xl">Extra Large</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-gray-500">
                Choose a size that fits your design
              </p>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border hover:border-gray-300 transition-colors">
              <div className="space-y-0.5">
                <Label htmlFor="titleBold" className="font-medium">Bold Title</Label>
                <p className="text-sm text-gray-500">
                  Make your title stand out with bold text
                </p>
              </div>
              <Switch
                id="titleBold"
                checked={config.titleBold !== false}
                onCheckedChange={(checked) => updateConfig({ titleBold: checked })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description" className="font-medium">Description</Label>
              <Textarea
                id="description"
                value={config.description || ""}
                onChange={(e) => updateConfig({ description: e.target.value })}
                placeholder="Enter a description for your waitlist"
                rows={3}
              />
              <p className="text-sm text-gray-500">
                A brief explanation of what users are signing up for
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="descriptionColor" className="font-medium">Description Color</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="descriptionColor"
                  type="color"
                  value={config.descriptionColor || "#6B7280"}
                  onChange={(e) => updateConfig({ descriptionColor: e.target.value })}
                  className="w-12 h-10 p-1"
                />
                <Input
                  value={config.descriptionColor || "#6B7280"}
                  onChange={(e) => updateConfig({ descriptionColor: e.target.value })}
                  className="flex-1"
                />
              </div>
              <p className="text-sm text-gray-500">
                Usually a lighter color than the title for better hierarchy
              </p>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border hover:border-gray-300 transition-colors">
              <div className="space-y-0.5">
                <Label htmlFor="descriptionBold" className="font-medium">Bold Description</Label>
                <p className="text-sm text-gray-500">
                  Increase emphasis on your description text
                </p>
              </div>
              <Switch
                id="descriptionBold"
                checked={config.descriptionBold || false}
                onCheckedChange={(checked) => updateConfig({ descriptionBold: checked })}
              />
            </div>
          </div>

          <Separator />

          {/* Form Elements */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="h-5 w-5 text-blue-500" />
              <h3 className="text-lg font-medium">Form Elements</h3>
            </div>

            <div className="space-y-2">
              <Label htmlFor="placeholderText" className="font-medium">Email Placeholder</Label>
              <Input
                id="placeholderText"
                value={config.placeholderText}
                onChange={(e) => updateConfig({ placeholderText: e.target.value })}
                placeholder="Enter placeholder text"
              />
              <p className="text-sm text-gray-500">
                Text that appears in the email input field
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="buttonText" className="font-medium">Button Text</Label>
              <Input
                id="buttonText"
                value={config.buttonText}
                onChange={(e) => updateConfig({ buttonText: e.target.value })}
                placeholder="Enter button text"
              />
              <p className="text-sm text-gray-500">
                Text for the call-to-action button
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="successMessage" className="font-medium">Success Message</Label>
              <Input
                id="successMessage"
                value={config.successMessage}
                onChange={(e) => updateConfig({ successMessage: e.target.value })}
                placeholder="Enter success message"
              />
              <p className="text-sm text-gray-500">
                Message shown after successful signup
              </p>
            </div>
          </div>

          <Separator />

          {/* Additional Fields */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Users className="h-5 w-5 text-green-500" />
              <h3 className="text-lg font-medium">Additional Fields</h3>
            </div>

            <div className="flex items-center justify-between p-3 bg-white rounded-lg border hover:border-gray-300 transition-colors">
              <div className="space-y-0.5">
                <Label htmlFor="collectName" className="font-medium">Collect Name</Label>
                <p className="text-sm text-gray-500">
                  Add a name field to your form
                </p>
              </div>
              <Switch
                id="collectName"
                checked={config.collectName}
                onCheckedChange={(checked) => updateConfig({ collectName: checked })}
              />
            </div>

            <div className="flex items-center justify-between p-3 bg-white rounded-lg border hover:border-gray-300 transition-colors">
              <div className="space-y-0.5">
                <Label htmlFor="collectCompany" className="font-medium">Collect Company</Label>
                <p className="text-sm text-gray-500">
                  Add a company field to your form
                </p>
              </div>
              <Switch
                id="collectCompany"
                checked={config.collectCompany}
                onCheckedChange={(checked) => updateConfig({ collectCompany: checked })}
              />
            </div>
          </div>

          <Separator />

          {/* Social Proof & Referrals */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Bell className="h-5 w-5 text-amber-500" />
              <h3 className="text-lg font-medium">Social Proof & Referrals</h3>
            </div>

            <div className="flex items-center justify-between p-3 bg-white rounded-lg border hover:border-gray-300 transition-colors">
              <div className="space-y-0.5">
                <Label htmlFor="showSocialProof" className="font-medium">Show Social Proof</Label>
                <p className="text-sm text-gray-500">
                  Display avatars and signup count
                </p>
              </div>
              <Switch
                id="showSocialProof"
                checked={config.showSocialProof}
                onCheckedChange={(checked) => updateConfig({ showSocialProof: checked })}
              />
            </div>

            <div className="flex items-center justify-between p-3 bg-white rounded-lg border hover:border-gray-300 transition-colors">
              <div className="space-y-0.5">
                <Label htmlFor="enableReferrals" className="font-medium">Enable Referrals</Label>
                <p className="text-sm text-gray-500">
                  Allow users to skip the queue by referring others
                </p>
              </div>
              <Switch
                id="enableReferrals"
                checked={config.enableReferrals}
                onCheckedChange={(checked) => updateConfig({ enableReferrals: checked })}
              />
            </div>

            {config.enableReferrals && (
              <div className="p-4 bg-gray-50 rounded-lg border space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="positionsToSkip" className="font-medium">Positions to Skip</Label>
                  <Input
                    id="positionsToSkip"
                    type="number"
                    min="1"
                    max="100"
                    value={config.positionsToSkip}
                    onChange={(e) => updateConfig({ positionsToSkip: parseInt(e.target.value) })}
                  />
                  <p className="text-sm text-gray-500">
                    How many positions users can skip by referring others
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

export default SetupPanel;
