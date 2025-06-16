
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Settings, Trash2 } from 'lucide-react';
import { useDesign } from '@/contexts/DesignContext';

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
      <div className="text-center py-8">
        <div className="w-16 h-16 mx-auto bg-slate-100 rounded-full flex items-center justify-center mb-4">
          <Settings className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-sm font-medium text-slate-600 mb-2">No Element Selected</h3>
        <p className="text-xs text-slate-500">Click on an element in the canvas to edit its properties.</p>
      </div>
    );
  }

  return (
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
  );
};

export default PropertyTools;
