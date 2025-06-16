
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { designSystem, getIconContainerStyles } from '@/lib/design-system';

interface ToolsHeaderProps {
  onBack: () => void;
}

const ToolsHeader: React.FC<ToolsHeaderProps> = ({ onBack }) => {
  return (
    <div className={`${designSystem.spacing.card} border-b border-gray-100/80 bg-gradient-to-r from-white to-gray-50/60`}>
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onBack} 
          className="mr-3 hover:bg-gray-100/80 text-gray-600 hover:text-gray-800 transition-all duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h2 className={`${designSystem.typography.heading} flex items-center`}>
            <div className={getIconContainerStyles('indigo')}>
              <Sparkles className="w-4 h-4" />
            </div>
            Design Studio
          </h2>
          <p className={`${designSystem.typography.muted} mt-1 ml-11`}>Create stunning print designs</p>
        </div>
      </div>
    </div>
  );
};

export default ToolsHeader;
