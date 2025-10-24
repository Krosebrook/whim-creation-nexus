
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Settings, Trash2, Edit3, Palette, RotateCw, Eye, Type } from 'lucide-react';
import { useDesign } from '@/contexts/DesignContext';

const GOOGLE_FONTS = [
  { name: 'Roboto', family: 'Roboto, sans-serif' },
  { name: 'Open Sans', family: 'Open Sans, sans-serif' },
  { name: 'Lato', family: 'Lato, sans-serif' },
  { name: 'Montserrat', family: 'Montserrat, sans-serif' },
  { name: 'Playfair Display', family: 'Playfair Display, serif' },
  { name: 'Poppins', family: 'Poppins, sans-serif' },
  { name: 'Raleway', family: 'Raleway, sans-serif' },
  { name: 'Merriweather', family: 'Merriweather, serif' },
  { name: 'Oswald', family: 'Oswald, sans-serif' },
  { name: 'Bebas Neue', family: 'Bebas Neue, sans-serif' },
  { name: 'Pacifico', family: 'Pacifico, cursive' },
  { name: 'Dancing Script', family: 'Dancing Script, cursive' },
];

const PropertyTools: React.FC = () => {
  const { state, dispatch } = useDesign();
  const selectedElement = state.elements.find(el => el.id === state.selectedElement);

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

  if (!selectedElement) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mb-6">
          <Settings className="w-10 h-10 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">No Element Selected</h3>
        <p className="text-sm text-gray-500 leading-relaxed max-w-xs mx-auto">
          Click on any element in the canvas to edit its properties and customize its appearance.
        </p>
      </div>
    );
  }

  return (
    <Card className="border-none shadow-lg bg-gradient-to-br from-white to-indigo-50/30">
      <CardHeader className="pb-4">
        <CardTitle className="text-sm flex items-center text-gray-700">
          <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
            <Edit3 className="w-4 h-4 text-indigo-600" />
          </div>
          Element Properties
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {selectedElement.type === 'text' && (
          <div className="space-y-4">
            <div>
              <Label className="text-gray-600 text-sm font-medium flex items-center mb-2">
                <Edit3 className="w-3 h-3 mr-1" />
                Text Content
              </Label>
              <Input
                value={selectedElement.content || ''}
                onChange={(e) => updateSelectedElement({ content: e.target.value })}
                className="bg-white/80 border-indigo-200 text-gray-700 focus:border-indigo-300 focus:ring-indigo-200"
              />
            </div>
            
            <div>
              <Label className="text-gray-600 text-sm font-medium flex items-center mb-2">
                <Type className="w-3 h-3 mr-1" />
                Font Family
              </Label>
              <Select 
                value={selectedElement.fontFamily || 'Inter, system-ui, sans-serif'}
                onValueChange={(value) => updateSelectedElement({ fontFamily: value })}
              >
                <SelectTrigger className="bg-white/80 border-indigo-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="max-h-[300px]">
                  {GOOGLE_FONTS.map((font) => (
                    <SelectItem 
                      key={font.family} 
                      value={font.family}
                      style={{ fontFamily: font.family }}
                    >
                      {font.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label className="text-gray-600 text-sm font-medium flex items-center mb-3">
                <span className="w-3 h-3 mr-1 text-xs">Aa</span>
                Font Size: {selectedElement.fontSize}px
              </Label>
              <Slider
                value={[selectedElement.fontSize || 24]}
                onValueChange={([value]) => updateSelectedElement({ fontSize: value })}
                max={120}
                min={8}
                step={1}
                className="mt-2"
              />
            </div>
            
            <div>
              <Label className="text-gray-600 text-sm font-medium flex items-center mb-3">
                <span className="font-bold mr-1">W</span>
                Font Weight: {selectedElement.fontWeight || 400}
              </Label>
              <Slider
                value={[selectedElement.fontWeight || 400]}
                onValueChange={([value]) => updateSelectedElement({ fontWeight: value })}
                max={900}
                min={100}
                step={100}
                className="mt-2"
              />
            </div>
          </div>
        )}
        
        <div>
          <Label className="text-gray-600 text-sm font-medium flex items-center mb-2">
            <Palette className="w-3 h-3 mr-1" />
            Color
          </Label>
          <Input
            type="color"
            value={selectedElement.color || '#000000'}
            onChange={(e) => updateSelectedElement({ color: e.target.value })}
            className="bg-white/80 border-indigo-200 h-12"
          />
        </div>
        
        <div>
          <Label className="text-gray-600 text-sm font-medium flex items-center mb-3">
            <Eye className="w-3 h-3 mr-1" />
            Opacity: {Math.round((selectedElement.opacity || 1) * 100)}%
          </Label>
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
          <Label className="text-gray-600 text-sm font-medium flex items-center mb-3">
            <RotateCw className="w-3 h-3 mr-1" />
            Rotation: {selectedElement.rotation || 0}°
          </Label>
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
          className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-md"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Delete Element
        </Button>
      </CardContent>
    </Card>
  );
};

export default PropertyTools;
