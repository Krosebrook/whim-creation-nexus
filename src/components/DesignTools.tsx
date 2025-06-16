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
  Sparkles,
  Settings
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
          <ProductCategorySelector onSelectProduct={handleProductSelect} />
        )}

        {activeTab === 'platform' && (
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center text-slate-700">
                <Download className="w-4 h-4 mr-2 text-blue-500" />
                Platform Optimization
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-slate-600 text-sm font-medium">Target Platform</Label>
                <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
                  <SelectTrigger className="bg-white border-slate-200 text-slate-700 mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-slate-200">
                    <SelectItem value="printify">Printify</SelectItem>
                    <SelectItem value="amazon">Amazon Merch</SelectItem>
                    <SelectItem value="shopify">Shopify</SelectItem>
                    <SelectItem value="canva">Canva</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                <p className="text-xs text-blue-700 font-medium">
                  {selectedPlatform === 'amazon' && '✨ High contrast designs work best'}
                  {selectedPlatform === 'printify' && '🎨 Colorful, detailed designs recommended'}
                  {selectedPlatform === 'shopify' && '🏪 Professional, branded designs preferred'}
                  {selectedPlatform === 'canva' && '📐 Template-friendly designs perform well'}
                </p>
              </div>
              
              <Button 
                onClick={() => {
                  const optimized = optimizeForPlatform(state.elements, selectedPlatform);
                  dispatch({ type: 'CLEAR_CANVAS' });
                  optimized.forEach(element => {
                    dispatch({ type: 'ADD_ELEMENT', element });
                  });
                }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
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
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center text-slate-700">
                  <Type className="w-4 h-4 mr-2 text-green-500" />
                  Add Text
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Input
                  placeholder="Enter text..."
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  className="bg-white border-slate-200 text-slate-700"
                />
                <Button onClick={addTextElement} className="w-full bg-green-600 hover:bg-green-700 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Text
                </Button>
              </CardContent>
            </Card>

            {/* Shape Tools */}
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center text-slate-700">
                  <Square className="w-4 h-4 mr-2 text-purple-500" />
                  Add Shapes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addShapeElement('rectangle')}
                    className="bg-white border-slate-200 hover:bg-slate-50 flex items-center justify-center h-12"
                  >
                    <Square className="w-5 h-5 text-slate-600" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addShapeElement('circle')}
                    className="bg-white border-slate-200 hover:bg-slate-50 flex items-center justify-center h-12"
                  >
                    <Circle className="w-5 h-5 text-slate-600" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addShapeElement('triangle')}
                    className="bg-white border-slate-200 hover:bg-slate-50 flex items-center justify-center h-12"
                  >
                    <Triangle className="w-5 h-5 text-slate-600" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addShapeElement('star')}
                    className="bg-white border-slate-200 hover:bg-slate-50 flex items-center justify-center h-12"
                  >
                    <Star className="w-5 h-5 text-slate-600" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Pattern Tools */}
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center text-slate-700">
                  <Palette className="w-4 h-4 mr-2 text-orange-500" />
                  Add Patterns
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addPatternElement('stripes')}
                    className="w-full bg-white border-slate-200 hover:bg-slate-50 justify-start"
                  >
                    <div className="w-4 h-4 mr-2 bg-gradient-to-r from-orange-400 to-orange-600 rounded"></div>
                    Stripes
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addPatternElement('dots')}
                    className="w-full bg-white border-slate-200 hover:bg-slate-50 justify-start"
                  >
                    <div className="w-4 h-4 mr-2 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"></div>
                    Dots
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addPatternElement('gradient')}
                    className="w-full bg-white border-slate-200 hover:bg-slate-50 justify-start"
                  >
                    <div className="w-4 h-4 mr-2 bg-gradient-to-r from-purple-400 to-pink-600 rounded"></div>
                    Gradient
                  </Button>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {activeTab === 'properties' && selectedElement && (
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center text-slate-700">
                <Settings className="w-4 h-4 mr-2 text-indigo-500" />
                Element Properties
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {selectedElement.type === 'text' && (
                <>
                  <div>
                    <Label className="text-slate-600 text-sm font-medium">Text Content</Label>
                    <Input
                      value={selectedElement.content || ''}
                      onChange={(e) => updateSelectedElement({ content: e.target.value })}
                      className="bg-white border-slate-200 text-slate-700 mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-slate-600 text-sm font-medium">
                      Font Size: {selectedElement.fontSize}px
                    </Label>
                    <Slider
                      value={[selectedElement.fontSize || 24]}
                      onValueChange={([value]) => updateSelectedElement({ fontSize: value })}
                      max={72}
                      min={8}
                      step={1}
                      className="mt-3"
                    />
                  </div>
                </>
              )}
              
              <div>
                <Label className="text-slate-600 text-sm font-medium">Color</Label>
                <Input
                  type="color"
                  value={selectedElement.color || '#000000'}
                  onChange={(e) => updateSelectedElement({ color: e.target.value })}
                  className="bg-white border-slate-200 h-12 mt-1"
                />
              </div>
              
              <div>
                <Label className="text-slate-600 text-sm font-medium">
                  Opacity: {Math.round((selectedElement.opacity || 1) * 100)}%
                </Label>
                <Slider
                  value={[selectedElement.opacity || 1]}
                  onValueChange={([value]) => updateSelectedElement({ opacity: value })}
                  max={1}
                  min={0}
                  step={0.1}
                  className="mt-3"
                />
              </div>
              
              <div>
                <Label className="text-slate-600 text-sm font-medium">
                  Rotation: {selectedElement.rotation || 0}°
                </Label>
                <Slider
                  value={[selectedElement.rotation || 0]}
                  onValueChange={([value]) => updateSelectedElement({ rotation: value })}
                  max={360}
                  min={-360}
                  step={1}
                  className="mt-3"
                />
              </div>
              
              <Button 
                onClick={deleteSelectedElement}
                variant="destructive"
                size="sm"
                className="w-full bg-red-600 hover:bg-red-700 text-white"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Element
              </Button>
            </CardContent>
          </Card>
        )}

        {activeTab === 'properties' && !selectedElement && (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <Settings className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-sm font-medium text-slate-600 mb-2">No Element Selected</h3>
            <p className="text-xs text-slate-500">Click on an element in the canvas to edit its properties.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DesignTools;
