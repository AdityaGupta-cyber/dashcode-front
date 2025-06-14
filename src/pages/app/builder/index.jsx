import React, { useState, useEffect } from 'react';
import ConfigPanel from "@/components/waitlist-builder/ConfigPanel"
import WidgetPreview from "@/components/waitlist-builder/WidgetPreview"
import { Card } from "@/components/waitlist-builder/ui/card"
import { ConfigProvider, useConfig } from '@/components/waitlist-builder/contexts/ConfigContext';
import { Button } from "@/components/waitlist-builder/ui/button"
import { Save, ExternalLink } from "lucide-react"
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

// This inner component will have access to the config context
function BuilderContent() {
    const [showEmbedCode, setShowEmbedCode] = useState(false);
    const { saveConfig, config, updateConfig } = useConfig();
    const { waitlistId } = useParams();
    
    // Add waitlistId to config when component mounts
    useEffect(() => {
        if (waitlistId && (!config.id || config.id !== waitlistId)) {
            updateConfig({ id: waitlistId });
        }
    }, [waitlistId, config.id, updateConfig]);
    
    const handleSave = () => {
        console.log("Saving configuration...");
        // Make sure waitlistId is set in config before saving
        if (waitlistId && (!config.id || config.id !== waitlistId)) {
            updateConfig({ id: waitlistId });
        }
        toast.success("Configuration saved successfully!");
        saveConfig();
    };
    
    const handleViewPage = () => {
        console.log("Opening waitlist preview with ID:", waitlistId);
        
        // If for some reason waitlistId is missing, use a default or fetch from config
        const idToUse = waitlistId || config.id || 'default';
        
        // Save current config before opening preview
        saveConfig().then(() => {
            window.open(`/waitlist/${idToUse}`, "_blank");
        });
    };

    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-700">Preview</h2>
            <div className="flex space-x-2">
              <Button onClick={handleSave} className="flex items-center gap-1">
                <Save className="h-4 w-4" />
                Save
              </Button>
              <Button onClick={handleViewPage} variant="outline" className="flex items-center gap-1">
                <ExternalLink className="h-4 w-4" />
                View Page
              </Button>
            </div>
          </div>
          <Card className="flex-1 p-4 md:p-6 flex items-center justify-center bg-white">
            <WidgetPreview />
          </Card>
          
          {showEmbedCode && (
            <div className="mt-6">
              <h3 className="text-md font-medium text-gray-700 mb-2">Embed Code</h3>
              <Card className="bg-gray-50 p-4">
                <pre className="text-sm overflow-x-auto text-gray-700">
                  {`<script src="https://yourwaitlist.com/widget.js"></script>\n<div id="waitlist-widget" data-widget-id="unique-id"></div>`}
                </pre>
              </Card>
            </div>
          )}
        </div>
        
        <div className="flex flex-col">
          <h2 className="text-lg font-medium text-gray-700 mb-4">Configuration</h2>
          <Card className="flex-1 p-4 md:p-6 bg-white">
            <ConfigPanel onShowEmbed={() => setShowEmbedCode(true)} />
          </Card>
        </div>
      </div>
    );
}

function WaitlistBuilder() {
    const { waitlistId } = useParams();
    const savedConfig = useSelector(state => state.waitlist.config);
    
    return (
      <div className="flex-1 p-3 md:p-6">
        <ConfigProvider initialConfig={savedConfig}>
          <BuilderContent />
        </ConfigProvider>
      </div>
    );
}

export default WaitlistBuilder