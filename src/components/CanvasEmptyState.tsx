
import React from 'react';
import { Sparkles } from 'lucide-react';
import { designSystem } from '@/lib/design-system';

const CanvasEmptyState: React.FC = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-center space-y-6 max-w-sm">
        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center">
          <Sparkles className="w-10 h-10 text-indigo-500" />
        </div>
        <div className="space-y-3">
          <h3 className={`text-xl font-bold ${designSystem.typography.heading}`}>Ready to Create?</h3>
          <p className={`${designSystem.typography.body} leading-relaxed`}>
            Choose a product category from the sidebar to start designing your print-on-demand masterpiece.
          </p>
        </div>
        <div className="flex items-center justify-center space-x-2 text-xs text-gray-400">
          <div className="w-2 h-2 bg-indigo-200 rounded-full animate-pulse"></div>
          <span>Waiting for your creativity</span>
        </div>
      </div>
    </div>
  );
};

export default CanvasEmptyState;
