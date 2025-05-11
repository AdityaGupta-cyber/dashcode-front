import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Plus, X, Edit } from "lucide-react";
// import { 
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
// } from "@/components/ui/form";
import { useState } from "react";

import { useConfig } from "./contexts/ConfigContext";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card } from "./ui/card";import { CardContent } from "./ui/card";

const AdvancedPanel = () => {
  const { config, updateConfig, addCustomField, updateCustomField, removeCustomField } = useConfig();
  const [editingField, setEditingField] = useState(null);

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-6">
          {/* Custom Form Fields */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-md font-medium">Custom Form Fields</h3>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={addCustomField}
                className="flex items-center gap-1"
              >
                <Plus className="h-4 w-4" />
                Add Field
              </Button>
            </div>
            
            <div className="space-y-4">
              {config.customFields.length === 0 ? (
                <div className="text-center py-4 text-sm text-muted-foreground">
                  No custom fields added. Click "Add Field" to create your first custom form field.
                </div>
              ) : (
                config.customFields.map((field) => (
                  <div 
                    key={field.id} 
                    className="border rounded-lg p-4 relative"
                  >
                    {editingField === field.id ? (
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label htmlFor={`${field.id}-label`}>Field Label</Label>
                            <Input 
                              id={`${field.id}-label`}
                              value={field.label}
                              onChange={(e) => updateCustomField(field.id, { label: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label htmlFor={`${field.id}-type`}>Field Type</Label>
                            <Select
                              value={field.type}
                              onValueChange={(value) => updateCustomField(
                                field.id, 
                                { type: value }
                              )}
                            >
                              <SelectTrigger id={`${field.id}-type`}>
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent position="popper">
                                <SelectItem value="text">Text</SelectItem>
                                <SelectItem value="email">Email</SelectItem>
                                <SelectItem value="number">Number</SelectItem>
                                <SelectItem value="phone">Phone</SelectItem>
                                <SelectItem value="url">URL</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor={`${field.id}-placeholder`}>Placeholder</Label>
                          <Input 
                            id={`${field.id}-placeholder`}
                            value={field.placeholder}
                            onChange={(e) => updateCustomField(field.id, { placeholder: e.target.value })}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Switch 
                              id={`${field.id}-required`}
                              checked={field.required}
                              onCheckedChange={(checked) => updateCustomField(field.id, { required: checked })}
                            />
                            <Label htmlFor={`${field.id}-required`}>Required field</Label>
                          </div>
                          
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => setEditingField(null)}
                          >
                            Done
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-sm">{field.label}</h4>
                          <div className="flex items-center text-xs text-muted-foreground space-x-2 mt-1">
                            <span className="bg-gray-100 px-2 py-0.5 rounded">{field.type}</span>
                            {field.required && <span className="text-red-500">Required</span>}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => setEditingField(field.id)}
                            className="h-8 w-8 p-0"
                          >
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => removeCustomField(field.id)}
                            className="h-8 w-8 p-0 text-red-500 hover:text-red-600"
                          >
                            <X className="h-4 w-4" />
                            <span className="sr-only">Remove</span>
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
          
          {/* Existing Form Fields */}
          <div className="space-y-4">
            <h3 className="text-md font-medium">Standard Fields</h3>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="collectName">Name Field</Label>
                <p className="text-sm text-muted-foreground">
                  Add a name field to your waitlist form
                </p>
              </div>
              <Switch
                id="collectName"
                checked={config.collectName}
                onCheckedChange={(checked) => updateConfig({ collectName: checked })}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="collectCompany">Company Field</Label>
                <p className="text-sm text-muted-foreground">
                  Add a company field to your waitlist form
                </p>
              </div>
              <Switch
                id="collectCompany"
                checked={config.collectCompany}
                onCheckedChange={(checked) => updateConfig({ collectCompany: checked })}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="enableCaptcha">Enable CAPTCHA</Label>
                <p className="text-sm text-muted-foreground">
                  Protect your form from spam submissions
                </p>
              </div>
              <Switch
                id="enableCaptcha"
                checked={config.enableCaptcha}
                onCheckedChange={(checked) => updateConfig({ enableCaptcha: checked })}
              />
            </div>
          </div>
          
          {/* Launch Countdown */}
          <div className="space-y-4">
            <h3 className="text-md font-medium">Launch Countdown</h3>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="showCountdown">Show Countdown</Label>
                <p className="text-sm text-muted-foreground">
                  Display a countdown timer to build anticipation
                </p>
              </div>
              <Switch
                id="showCountdown"
                checked={config.showCountdown}
                onCheckedChange={(checked) => updateConfig({ showCountdown: checked })}
              />
            </div>
            
            {config.showCountdown && (
              <div className="space-y-2">
                <Label htmlFor="countdownDate">Countdown Date</Label>
                <Input
                  id="countdownDate"
                  type="datetime-local"
                  value={config.countdownDate.slice(0, 16)}
                  onChange={(e) => {
                    const date = new Date(e.target.value);
                    updateConfig({ countdownDate: date.toISOString() });
                  }}
                />
                <p className="text-sm text-muted-foreground">
                  Set the date and time when your product will launch
                </p>
              </div>
            )}
          </div>
          
          {/* Email Verification */}
          <div className="space-y-4">
            <h3 className="text-md font-medium">Email Verification</h3>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="enableEmailVerification">Email Verification</Label>
                <p className="text-sm text-muted-foreground">
                  Require users to verify their email address
                </p>
              </div>
              <Switch
                id="enableEmailVerification"
                checked={config.enableEmailVerification}
                onCheckedChange={(checked) => updateConfig({ enableEmailVerification: checked })}
              />
            </div>
          </div>
          
          {/* Progress Updates */}
          <div className="space-y-4">
            <h3 className="text-md font-medium">Progress Updates</h3>
            
            <div className="space-y-2">
              <Label htmlFor="progressUpdateFrequency">Update Frequency</Label>
              <Select 
                value={config.progressUpdateFrequency} 
                onValueChange={(value) => updateConfig({ 
                  progressUpdateFrequency: value 
                })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">
                How often to send position updates to waitlist subscribers
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdvancedPanel;
