import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useDesign } from '@/contexts/DesignContext';
import { 
  Type, 
  Square, 
  Circle, 
  Triangle, 
  Palette, 
  ArrowLeft,
  Plus,
  Trash2,
  Star,
  Shuffle,
  Layers,
  Download,
  Sparkles
} from 'lucide-react';
import ProductCategorySelector from './ProductCategorySelector';
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
  const { state, dispatch } = useDesign();
  const [activeTab, setActiveTab] = useState('products');
  const [textInput, setTextInput] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('printify');
  
  const selectedElement = state.elements.find(el => el.id === state.selectedElement);

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
    
    // Optimize for selected platform
    elements = optimizeForPlatform(elements, selectedPlatform);
    
    elements.forEach(element => {
      dispatch({ type: 'ADD_ELEMENT', element });
    });
    
    setActiveTab('elements');
  };

  const addTextElement = () => {
    if (!textInput.trim()) return;
    
    const element = {
      id: generateId(),
      type: 'text' as const,
      x: 100,
      y: 100,
      width: 200,
      height: 50,
      rotation: 0,
      opacity: 1,
      content: textInput,
      color: '#000000',
      fontSize: 24,
      fontFamily: 'Arial',
    };
    
    dispatch({ type: 'ADD_ELEMENT', element });
    setTextInput('');
  };

  const addShapeElement = (shapeType: 'rectangle' | 'circle' | 'triangle' | 'star') => {
    const element = {
      id: generateId(),
      type: 'shape' as const,
      x: 150,
      y: 150,
      width: 100,
      height: 100,
      rotation: 0,
      opacity: 1,
      color: '#8b5cf6',
      shapeType,
    };
    
    dispatch({ type: 'ADD_ELEMENT', element });
  };

  const addPatternElement = (patternType: 'stripes' | 'dots' | 'gradient') => {
    const element = {
      id: generateId(),
      type: 'pattern' as const,
      x: 200,
      y: 200,
      width: 150,
      height: 150,
      rotation: 0,
      opacity: 1,
      color: '#3b82f6',
      patternType,
    };
    
    dispatch({ type: 'ADD_ELEMENT', element });
  };

  const updateSelectedElement = (updates: any) => {
    if (selectedElement) {
      dispatch({ type: 'UPDATE_ELEMENT', id: selectedElement.id, updates });
    }
  };

  const deleteSelectedElement = () => {
    if (selectedElement) {
      dispatch({ type: 'DELETE_ELEMENT', id: selectedElement.id });
    }
  };

  const tabs = [
    { id: 'products', label: 'Products', icon: Layers },
    { id: 'elements', label: 'Elements', icon: Plus },
    { id: 'properties', label: 'Properties', icon: Palette },
    { id: 'platform', label: 'Platform', icon: Download },
  ];

  return (
    <div className="w-80 bg-slate-800 text-white border-r border-slate-700 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center mb-4">
          <Button variant="ghost" size="sm" onClick={onBack} className="mr-2">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h2 className="text-lg font-semibold capitalize">Design Studio</h2>
        </div>
        
        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-slate-700 rounded-lg p-1">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center px-2 py-2 rounded-md text-xs font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-slate-600'
                }`}
              >
                <IconComponent className="w-3 h-3 mr-1" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {activeTab === 'products' && (
          <ProductCategorySelector onSelectProduct={handleProductSelect} />
        )}

        {activeTab === 'platform' && (
          <Card className="bg-slate-700 border-slate-600">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center text-white">
                <Download className="w-4 h-4 mr-2" />
                Platform Optimization
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-gray-300 text-sm">Target Platform</Label>
                <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
                  <SelectTrigger className="bg-slate-600 border-slate-500 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="printify">Printify</SelectItem>
                    <SelectItem value="amazon">Amazon Merch</SelectItem>
                    <SelectItem value="shopify">Shopify</SelectItem>
                    <SelectItem value="canva">Canva</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="text-xs text-gray-400">
                {selectedPlatform === 'amazon' && 'High contrast designs work best'}
                {selectedPlatform === 'printify' && 'Colorful, detailed designs recommended'}
                {selectedPlatform === 'shopify' && 'Professional, branded designs preferred'}
                {selectedPlatform === 'canva' && 'Template-friendly designs perform well'}
              </div>
              
              <Button 
                onClick={() => {
                  const optimized = optimizeForPlatform(state.elements, selectedPlatform);
                  dispatch({ type: 'CLEAR_CANVAS' });
                  optimized.forEach(element => {
                    dispatch({ type: 'ADD_ELEMENT', element });
                  });
                }}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Optimize for {selectedPlatform}
              </Button>
            </CardContent>
          </Card>
        )}

        {activeTab === 'elements' && (
          <>
            {/* Text Tools */}
            <Card className="bg-slate-700 border-slate-600">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center text-white">
                  <Type className="w-4 h-4 mr-2" />
                  Add Text
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Input
                  placeholder="Enter text..."
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  className="bg-slate-600 border-slate-500 text-white"
                />
                <Button onClick={addTextElement} className="w-full bg-purple-600 hover:bg-purple-700">
                  Add Text
                </Button>
              </CardContent>
            </Card>

            {/* Shape Tools */}
            <Card className="bg-slate-700 border-slate-600">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center text-white">
                  <Square className="w-4 h-4 mr-2" />
                  Add Shapes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addShapeElement('rectangle')}
                    className="bg-slate-600 border-slate-500 hover:bg-slate-500"
                  >
                    <Square className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addShapeElement('circle')}
                    className="bg-slate-600 border-slate-500 hover:bg-slate-500"
                  >
                    <Circle className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addShapeElement('triangle')}
                    className="bg-slate-600 border-slate-500 hover:bg-slate-500"
                  >
                    <Triangle className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addShapeElement('star')}
                    className="bg-slate-600 border-slate-500 hover:bg-slate-500"
                  >
                    <Star className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Pattern Tools */}
            <Card className="bg-slate-700 border-slate-600">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center text-white">
                  <Palette className="w-4 h-4 mr-2" />
                  Add Patterns
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addPatternElement('stripes')}
                    className="w-full bg-slate-600 border-slate-500 hover:bg-slate-500"
                  >
                    Stripes
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addPatternElement('dots')}
                    className="w-full bg-slate-600 border-slate-500 hover:bg-slate-500"
                  >
                    Dots
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addPatternElement('gradient')}
                    className="w-full bg-slate-600 border-slate-500 hover:bg-slate-500"
                  >
                    Gradient
                  </Button>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {activeTab === 'properties' && selectedElement && (
          <Card className="bg-slate-700 border-slate-600">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center text-white">
                <Palette className="w-4 h-4 mr-2" />
                Element Properties
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedElement.type === 'text' && (
                <>
                  <div>
                    <Label className="text-gray-300 text-sm">Text Content</Label>
                    <Input
                      value={selectedElement.content || ''}
                      onChange={(e) => updateSelectedElement({ content: e.target.value })}
                      className="bg-slate-600 border-slate-500 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300 text-sm">Font Size: {selectedElement.fontSize}</Label>
                    <Slider
                      value={[selectedElement.fontSize || 24]}
                      onValueChange={([value]) => updateSelectedElement({ fontSize: value })}
                      max={72}
                      min={8}
                      step={1}
                      className="mt-2"
                    />
                  </div>
                </>
              )}
              
              <div>
                <Label className="text-gray-300 text-sm">Color</Label>
                <Input
                  type="color"
                  value={selectedElement.color || '#000000'}
                  onChange={(e) => updateSelectedElement({ color: e.target.value })}
                  className="bg-slate-600 border-slate-500 h-10"
                />
              </div>
              
              <div>
                <Label className="text-gray-300 text-sm">Opacity: {Math.round((selectedElement.opacity || 1) * 100)}%</Label>
                <Slider
                  value={[selectedElement.opacity || 1]}
                  onValueChange={([value]) => updateSelectedElement({ opacity: value })}
                  max={1}
                  min={0}
                  step={0.1}
                  className="mt-2"
                />
              </div>
              
              <div>
                <Label className="text-gray-300 text-sm">Rotation: {selectedElement.rotation || 0}°</Label>
                <Slider
                  value={[selectedElement.rotation || 0]}
                  onValueChange={([value]) => updateSelectedElement({ rotation: value })}
                  max={360}
                  min={-360}
                  step={1}
                  className="mt-2"
                />
              </div>
              
              <Button 
                onClick={deleteSelectedElement}
                variant="destructive"
                size="sm"
                className="w-full"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Element
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DesignTools;
