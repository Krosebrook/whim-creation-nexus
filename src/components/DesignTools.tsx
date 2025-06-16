
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
    { id: 'products', label: 'Products', icon: Layers, color: 'text-emerald-600' },
    { id: 'elements', label: 'Elements', icon: Plus, color: 'text-blue-600' },
    { id: 'properties', label: 'Properties', icon: Settings, color: 'text-purple-600' },
    { id: 'platform', label: 'Export', icon: Download, color: 'text-orange-600' },
  ];

  return (
    <div className="w-80 bg-white/95 backdrop-blur-sm border-r border-gray-200/50 flex flex-col shadow-xl">
      {/* Header */}
      <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-white to-gray-50/50">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onBack} 
            className="mr-3 hover:bg-gray-100 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h2 className="text-xl font-bold text-gray-800 flex items-center">
              <Sparkles className="w-5 h-5 mr-2 text-indigo-500" />
              Design Studio
            </h2>
            <p className="text-sm text-gray-500 mt-1">Create stunning print designs</p>
          </div>
        </div>
        
        {/* Tab Navigation */}
        <div className="grid grid-cols-2 gap-2">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center justify-center px-3 py-3 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-white text-gray-800 shadow-md shadow-gray-200/50 border border-gray-200'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <IconComponent className={`w-4 h-4 mr-2 ${activeTab === tab.id ? tab.color : ''}`} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/30">
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
