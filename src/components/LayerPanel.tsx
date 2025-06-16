
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Layers, 
  Eye, 
  EyeOff, 
  Trash2, 
  MoveUp, 
  MoveDown,
  Type,
  Square,
  Image,
  Palette
} from 'lucide-react';
import { useDesign } from '@/contexts/DesignContext';
import { DesignElement } from '@/types/design';

const LayerPanel: React.FC = () => {
  const { state, dispatch } = useDesign();

  const getElementIcon = (element: DesignElement) => {
    switch (element.type) {
      case 'text':
        return <Type className="w-4 h-4" />;
      case 'shape':
        return <Square className="w-4 h-4" />;
      case 'image':
        return <Image className="w-4 h-4" />;
      case 'pattern':
        return <Palette className="w-4 h-4" />;
      default:
        return <Square className="w-4 h-4" />;
    }
  };

  const getElementName = (element: DesignElement) => {
    if (element.type === 'text' && element.content) {
      return element.content.length > 15 ? element.content.substring(0, 15) + '...' : element.content;
    }
    if (element.type === 'shape') {
      return element.shapeType || 'Shape';
    }
    if (element.type === 'pattern') {
      return element.patternType || 'Pattern';
    }
    return element.type.charAt(0).toUpperCase() + element.type.slice(1);
  };

  const toggleVisibility = (elementId: string) => {
    const element = state.elements.find(el => el.id === elementId);
    if (element) {
      dispatch({
        type: 'UPDATE_ELEMENT',
        id: elementId,
        updates: { visible: element.visible !== false ? false : true }
      });
    }
  };

  const selectElement = (elementId: string) => {
    dispatch({ type: 'SELECT_ELEMENT', id: elementId });
  };

  const deleteElement = (elementId: string) => {
    dispatch({ type: 'DELETE_ELEMENT', id: elementId });
  };

  const moveElement = (elementId: string, direction: 'up' | 'down') => {
    const currentIndex = state.elements.findIndex(el => el.id === elementId);
    if (currentIndex === -1) return;

    const newElements = [...state.elements];
    const newIndex = direction === 'up' ? currentIndex + 1 : currentIndex - 1;
    
    if (newIndex >= 0 && newIndex < newElements.length) {
      [newElements[currentIndex], newElements[newIndex]] = [newElements[newIndex], newElements[currentIndex]];
      // This would require a new action type to reorder elements
    }
  };

  return (
    <Card className="border-none shadow-lg bg-gradient-to-br from-white to-indigo-50/30">
      <CardHeader className="pb-4">
        <CardTitle className="text-sm flex items-center text-gray-700">
          <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
            <Layers className="w-4 h-4 text-indigo-600" />
          </div>
          Layers ({state.elements.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {state.elements.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-4">
            No elements on canvas
          </p>
        ) : (
          state.elements.slice().reverse().map((element, index) => (
            <div
              key={element.id}
              className={`flex items-center gap-2 p-2 rounded-lg border transition-colors cursor-pointer ${
                state.selectedElements.includes(element.id)
                  ? 'bg-indigo-50 border-indigo-300'
                  : 'bg-white/80 border-gray-200 hover:bg-gray-50'
              }`}
              onClick={() => selectElement(element.id)}
            >
              <div className="text-gray-600">
                {getElementIcon(element)}
              </div>
              <span className="flex-1 text-sm text-gray-700 truncate">
                {getElementName(element)}
              </span>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleVisibility(element.id);
                  }}
                  className="w-6 h-6 p-0"
                >
                  {element.visible !== false ? (
                    <Eye className="w-3 h-3 text-gray-600" />
                  ) : (
                    <EyeOff className="w-3 h-3 text-gray-400" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteElement(element.id);
                  }}
                  className="w-6 h-6 p-0 text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default LayerPanel;
