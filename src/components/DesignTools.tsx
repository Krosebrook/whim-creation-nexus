
import React, { useState } from 'react';
import { useDesign } from '@/contexts/DesignContext';
import { 
  Plus,
  Layers,
  Download,
  Settings,
  AlignCenter,
  History,
  Keyboard
} from 'lucide-react';
import ProductTools from './ProductTools';
import ElementTools from './ElementTools';
import PropertyTools from './PropertyTools';
import PlatformTools from './PlatformTools';
import AlignmentTools from './AlignmentTools';
import LayerPanel from './LayerPanel';
import KeyboardShortcutsPanel from './KeyboardShortcutsPanel';
import ToolsHeader from './ToolsHeader';
import TabNavigation from './TabNavigation';
import { 
  generateApparelDesign, 
  generateAccessoryDesign, 
  generateHomeDesign, 
  generateStationeryDesign,
  optimizeForPlatform
} from '@/utils/designGenerators';
import { designSystem } from '@/lib/design-system';

interface DesignToolsProps {
  category: string;
  onBack: () => void;
}

const DesignTools: React.FC<DesignToolsProps> = ({ category, onBack }) => {
  const { dispatch } = useDesign();
  const [activeTab, setActiveTab] = useState('products');
  const [selectedPlatform] = useState('printify');

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
    { id: 'layers', label: 'Layers', icon: Layers, color: 'indigo' as const },
    { id: 'align', label: 'Align', icon: AlignCenter, color: 'blue' as const },
    { id: 'properties', label: 'Properties', icon: Settings, color: 'purple' as const },
    { id: 'platform', label: 'Export', icon: Download, color: 'orange' as const },
  ];

  return (
    <div className="w-80 bg-white/95 backdrop-blur-md border-r border-gray-200/60 flex flex-col shadow-xl">
      {/* Header */}
      <ToolsHeader onBack={onBack} />
      
      {/* Keyboard Shortcuts Button */}
      <div className="px-4 py-2 border-b border-gray-200/60">
        <KeyboardShortcutsPanel />
      </div>
      
      {/* Tab Navigation */}
      <div className={designSystem.spacing.card}>
        <TabNavigation tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {/* Tab Content */}
      <div className={`flex-1 overflow-y-auto ${designSystem.spacing.card} ${designSystem.spacing.section} bg-gradient-to-b from-gray-50/40 to-gray-100/20`}>
        {activeTab === 'products' && (
          <ProductTools onSelectProduct={handleProductSelect} />
        )}

        {activeTab === 'elements' && <ElementTools />}

        {activeTab === 'layers' && <LayerPanel />}

        {activeTab === 'align' && <AlignmentTools />}

        {activeTab === 'properties' && <PropertyTools />}

        {activeTab === 'platform' && <PlatformTools />}
      </div>
    </div>
  );
};

export default DesignTools;
