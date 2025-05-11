
import React, { useState } from 'react';
import ConfigPanel from "@/components/waitlist-builder/ConfigPanel"
import WidgetPreview from "@/components/waitlist-builder/WidgetPreview"
import { Card } from "@/components/waitlist-builder/ui/card"
import { ConfigProvider } from '@/components/waitlist-builder/contexts/ConfigContext';

function WaitlistBuilder() {
    const [showEmbedCode, setShowEmbedCode] = useState(false);

    return (
      <div className="flex-1 p-3 md:p-6">
        <ConfigProvider>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
            <div className="flex flex-col">
              <h2 className="text-lg font-medium text-gray-700 mb-4">Preview</h2>
              <Card className="flex-1 p-4 md:p-6 flex items-center justify-center">
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
              <ConfigPanel />
            </div>
          </div>
        </ConfigProvider>
      </div>
    );
}

export default WaitlistBuilder