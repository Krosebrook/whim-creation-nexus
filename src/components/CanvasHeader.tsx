
import React from 'react';
import { Eye, Palette, Grid } from 'lucide-react';
import { designSystem } from '@/lib/design-system';

interface CanvasHeaderProps {
  elementCount: number;
}

const CanvasHeader: React.FC<CanvasHeaderProps> = ({ elementCount }) => {
  return (
    <div className="bg-white/90 backdrop-blur-md border-b border-gray-200/70 p-4 flex items-center justify-between shadow-sm">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-400 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
          <div className="w-3 h-3 bg-green-400 rounded-full"></div>
        </div>
        <div className="flex items-center space-x-2">
          <Eye className="w-4 h-4 text-gray-500" />
          <span className={designSystem.typography.subheading}>Design Canvas</span>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className={`flex items-center space-x-2 ${designSystem.typography.muted} bg-gradient-to-r from-gray-100 to-gray-50 px-3 py-1.5 rounded-full border border-gray-200/60`}>
          <Palette className="w-3.5 h-3.5" />
          <span className="font-medium">{elementCount} elements</span>
        </div>
        <div className={`flex items-center space-x-2 ${designSystem.typography.muted} bg-gradient-to-r from-gray-100 to-gray-50 px-3 py-1.5 rounded-full border border-gray-200/60`}>
          <Grid className="w-3.5 h-3.5" />
          <span className="font-medium">1200 × 800</span>
        </div>
      </div>
    </div>
  );
};

export default CanvasHeader;
