import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Plus, X, Edit, Settings, Users, Shield, Clock, Mail, ChartBar } from "lucide-react";
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
import { Card } from "./ui/card";
import { CardContent } from "./ui/card";
import { Separator } from "./ui/separator";

const AdvancedPanel = () => {
  const { config, updateConfig } = useConfig();
  const [editingField, setEditingField] = useState(null);

  const addCustomField = () => {
    const newField = {
      id: `field-${Date.now()}`,
      type: 'text',
      label: 'New Field',
      placeholder: 'Enter value',
      required: false
    };
    
    updateConfig({ 
      customFields: [...config.customFields, newField] 
    });
    setEditingField(newField.id);
  };

  const updateCustomField = (id, updates) => {
    updateConfig({
      customFields: config.customFields.map(field => 
        field.id === id ? { ...field, ...updates } : field
      )
    });
  };

  const removeCustomField = (id) => {
    updateConfig({
      customFields: config.customFields.filter(field => field.id !== id)
    });
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-8">
          {/* Custom Form Fields */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Settings className="h-5 w-5 text-purple-500" />
              <h3 className="text-lg font-medium">Custom Form Fields</h3>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 border">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-gray-600">Add custom fields to collect additional information</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={addCustomField}
                  className="flex items-center gap-1 bg-white"
                >
                  <Plus className="h-4 w-4" />
                  Add Field
                </Button>
              </div>
              
              <div className="space-y-4">
                {config.customFields.length === 0 ? (
                  <div className="text-center py-6 text-sm text-gray-500 bg-white rounded-md border border-dashed">
                    No custom fields added. Click "Add Field" to create your first custom form field.
                  </div>
                ) : (
                  config.customFields.map((field) => (
                    <div 
                      key={field.id} 
                      className="border rounded-lg p-4 relative bg-white shadow-sm"
                    >
                      {editingField === field.id ? (
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor={`${field.id}-label`} className="mb-1.5 block">Field Label</Label>
                              <Input 
                                id={`${field.id}-label`}
                                value={field.label}
                                onChange={(e) => updateCustomField(field.id, { label: e.target.value })}
                                className="bg-white"
                              />
                            </div>
                            <div>
                              <Label htmlFor={`${field.id}-type`} className="mb-1.5 block">Field Type</Label>
                              <Select
                                value={field.type}
                                onValueChange={(value) => updateCustomField(
                                  field.id, 
                                  { type: value }
                                )}
                              >
                                <SelectTrigger id={`${field.id}-type`} className="bg-white">
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
                            <Label htmlFor={`${field.id}-placeholder`} className="mb-1.5 block">Placeholder</Label>
                            <Input 
                              id={`${field.id}-placeholder`}
                              value={field.placeholder}
                              onChange={(e) => updateCustomField(field.id, { placeholder: e.target.value })}
                              className="bg-white"
                            />
                          </div>
                          
                          <div className="flex items-center justify-between pt-2">
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
                              className="bg-white"
                            >
                              Done
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-sm">{field.label}</h4>
                            <div className="flex items-center text-xs text-gray-500 space-x-2 mt-1">
                              <span className="bg-gray-100 px-2 py-0.5 rounded">{field.type}</span>
                              {field.required && <span className="text-purple-500 font-medium">Required</span>}
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => setEditingField(field.id)}
                              className="h-8 w-8 p-0 hover:bg-gray-100"
                            >
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => removeCustomField(field.id)}
                              className="h-8 w-8 p-0 text-red-500 hover:bg-red-50"
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
          </div>
          
          <Separator />
          
          {/* Standard Fields */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Users className="h-5 w-5 text-blue-500" />
              <h3 className="text-lg font-medium">Standard Fields</h3>
            </div>
            
            <div className="grid gap-4">
              <div className="flex items-center justify-between p-3 bg-white rounded-lg border hover:border-gray-300 transition-colors">
                <div className="space-y-0.5">
                  <Label htmlFor="collectName" className="font-medium">Name Field</Label>
                  <p className="text-sm text-gray-500">
                    Add a name field to your waitlist form
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
                  <Label htmlFor="collectCompany" className="font-medium">Company Field</Label>
                  <p className="text-sm text-gray-500">
                    Add a company field to your waitlist form
                  </p>
                </div>
                <Switch
                  id="collectCompany"
                  checked={config.collectCompany}
                  onCheckedChange={(checked) => updateConfig({ collectCompany: checked })}
                />
              </div>
              
              <div className="flex items-center justify-between p-3 bg-white rounded-lg border hover:border-gray-300 transition-colors">
                <div className="space-y-0.5">
                  <Label htmlFor="enableCaptcha" className="font-medium">
                    <div className="flex items-center gap-1">
                      <Shield className="h-4 w-4 text-green-500" />
                      <span>Enable CAPTCHA</span>
                    </div>
                  </Label>
                  <p className="text-sm text-gray-500">
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
          </div>
          
          <Separator />
          
          {/* Launch Countdown */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="h-5 w-5 text-orange-500" />
              <h3 className="text-lg font-medium">Launch Countdown</h3>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border hover:border-gray-300 transition-colors">
              <div className="space-y-0.5">
                <Label htmlFor="showCountdown" className="font-medium">Show Countdown</Label>
                <p className="text-sm text-gray-500">
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
              <div className="p-4 bg-gray-50 rounded-lg border mt-2">
                <div className="space-y-2">
                  <Label htmlFor="countdownDate" className="font-medium">Countdown Date</Label>
                  <Input
                    id="countdownDate"
                    type="datetime-local"
                    value={config.countdownDate.slice(0, 16)}
                    onChange={(e) => {
                      const date = new Date(e.target.value);
                      updateConfig({ countdownDate: date.toISOString() });
                    }}
                    className="bg-white"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Set the date and time when your product will launch
                  </p>
                </div>
              </div>
            )}
          </div>
          
          <Separator />
          
          {/* Email Verification */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Mail className="h-5 w-5 text-indigo-500" />
              <h3 className="text-lg font-medium">Email Verification</h3>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border hover:border-gray-300 transition-colors">
              <div className="space-y-0.5">
                <Label htmlFor="emailVerification" className="font-medium">Email Verification</Label>
                <p className="text-sm text-gray-500">
                  Require users to verify their email address
                </p>
              </div>
              <Switch
                id="emailVerification"
                checked={config.emailVerification}
                onCheckedChange={(checked) => updateConfig({ emailVerification: checked })}
              />
            </div>
          </div>
          
          <Separator />
          
          {/* Progress Updates */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <ChartBar className="h-5 w-5 text-teal-500" />
              <h3 className="text-lg font-medium">Progress Updates</h3>
            </div>
            
            <div className="p-4 bg-white rounded-lg border">
              <div className="space-y-3">
                <Label htmlFor="progressUpdateFrequency" className="font-medium">Update Frequency</Label>
                <Select
                  value={config.progressUpdateFrequency}
                  onValueChange={(value) => updateConfig({ progressUpdateFrequency: value })}
                >
                  <SelectTrigger id="progressUpdateFrequency" className="bg-white">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="biweekly">Bi-weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-gray-500 mt-1">
                  How often to send position updates to waitlist subscribers
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdvancedPanel;
