
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useDesign } from '@/contexts/DesignContext';
import { 
  ArrowLeft,
  Plus,
  Layers,
  Download,
  Settings,
  Sparkles
} from 'lucide-react';
import ProductTools from './ProductTools';
import ElementTools from './ElementTools';
import PropertyTools from './PropertyTools';
import PlatformTools from './PlatformTools';
import { 
  generateApparelDesign, 
  generateAccessoryDesign, 
  generateHomeDesign, 
  generateStationeryDesign,
  optimizeForPlatform
} from '@/utils/designGenerators';
import { designSystem, getIconContainerStyles } from '@/lib/design-system';

interface DesignToolsProps {
  category: string;
  onBack: () => void;
}

const DesignTools: React.FC<DesignToolsProps> = ({ category, onBack }) => {
  const { dispatch } = useDesign();
  const [activeTab, setActiveTab] = useState('products');
  const [selectedPlatform] = useState('printify');

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const handleProductSelect = (category: string, subcategory: string) => {
    dispatch({ type: 'CLEAR_CANVAS' });
    
    let elements = [];
    
    switch (category) {
      case 'apparel':
        elements = generateApparelDesign(subcategory);
        break;
      case 'accessories':
        elements = generateAccessoryDesign(subcategory);
        break;
      case 'home':
        elements = generateHomeDesign(subcategory);
        break;
      case 'stationery':
        elements = generateStationeryDesign(subcategory);
        break;
      default:
        elements = [];
    }
    
    elements = optimizeForPlatform(elements, selectedPlatform);
    
    elements.forEach(element => {
      dispatch({ type: 'ADD_ELEMENT', element });
    });
    
    setActiveTab('elements');
  };

  const tabs = [
    { id: 'products', label: 'Products', icon: Layers, color: 'green' as const },
    { id: 'elements', label: 'Elements', icon: Plus, color: 'blue' as const },
    { id: 'properties', label: 'Properties', icon: Settings, color: 'purple' as const },
    { id: 'platform', label: 'Export', icon: Download, color: 'orange' as const },
  ];

  return (
    <div className="w-80 bg-white/95 backdrop-blur-md border-r border-gray-200/60 flex flex-col shadow-xl">
      {/* Header */}
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
        
        {/* Tab Navigation */}
        <div className="grid grid-cols-2 gap-2">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center justify-center px-3 py-3 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-white text-gray-800 shadow-md shadow-gray-200/60 border border-gray-200/80'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50/80'
                }`}
              >
                <IconComponent className={`w-4 h-4 mr-2 ${isActive ? `text-${tab.color}-600` : ''}`} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className={`flex-1 overflow-y-auto ${designSystem.spacing.card} ${designSystem.spacing.section} bg-gradient-to-b from-gray-50/40 to-gray-100/20`}>
        {activeTab === 'products' && (
          <ProductTools onSelectProduct={handleProductSelect} />
        )}

        {activeTab === 'elements' && <ElementTools />}

        {activeTab === 'properties' && <PropertyTools />}

        {activeTab === 'platform' && <PlatformTools />}
      </div>
    </div>
  );
};

export default DesignTools;
