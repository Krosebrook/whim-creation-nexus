
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useDesign } from '@/contexts/DesignContext';
import { 
  ArrowLeft,
  Plus,
  Layers,
  Download,
  Settings
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
    { id: 'products', label: 'Products', icon: Layers },
    { id: 'elements', label: 'Elements', icon: Plus },
    { id: 'properties', label: 'Properties', icon: Settings },
    { id: 'platform', label: 'Export', icon: Download },
  ];

  return (
    <div className="w-80 bg-white border-r border-slate-200 flex flex-col shadow-lg">
      {/* Header */}
      <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-purple-50 to-blue-50">
        <div className="flex items-center mb-4">
          <Button variant="ghost" size="sm" onClick={onBack} className="mr-3 hover:bg-white/50">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h2 className="text-xl font-bold text-slate-800">Design Studio</h2>
        </div>
        
        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-slate-100 rounded-lg p-1">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center px-3 py-2.5 rounded-md text-xs font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-white text-purple-600 shadow-sm'
                    : 'text-slate-600 hover:text-slate-800 hover:bg-white/50'
                }`}
              >
                <IconComponent className="w-4 h-4 mr-1.5" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
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
