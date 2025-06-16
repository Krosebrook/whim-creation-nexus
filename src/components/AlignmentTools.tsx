
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  AlignVerticalJustifyStart, 
  AlignVerticalJustifyCenter, 
  AlignVerticalJustifyEnd
} from 'lucide-react';
import { useDesign } from '@/contexts/DesignContext';

const AlignmentTools: React.FC = () => {
  const { state, dispatch } = useDesign();
  const selectedElements = state.elements.filter(el => state.selectedElements.includes(el.id));

  const alignElements = (type: string) => {
    if (selectedElements.length < 2) return;

    let updates: { [key: string]: Partial<any> } = {};

    switch (type) {
      case 'left':
        const leftmost = Math.min(...selectedElements.map(el => el.x));
        selectedElements.forEach(el => {
          updates[el.id] = { x: leftmost };
        });
        break;
      case 'center':
        const centerX = selectedElements.reduce((sum, el) => sum + el.x + el.width / 2, 0) / selectedElements.length;
        selectedElements.forEach(el => {
          updates[el.id] = { x: centerX - el.width / 2 };
        });
        break;
      case 'right':
        const rightmost = Math.max(...selectedElements.map(el => el.x + el.width));
        selectedElements.forEach(el => {
          updates[el.id] = { x: rightmost - el.width };
        });
        break;
      case 'top':
        const topmost = Math.min(...selectedElements.map(el => el.y));
        selectedElements.forEach(el => {
          updates[el.id] = { y: topmost };
        });
        break;
      case 'middle':
        const centerY = selectedElements.reduce((sum, el) => sum + el.y + el.height / 2, 0) / selectedElements.length;
        selectedElements.forEach(el => {
          updates[el.id] = { y: centerY - el.height / 2 };
        });
        break;
      case 'bottom':
        const bottommost = Math.max(...selectedElements.map(el => el.y + el.height));
        selectedElements.forEach(el => {
          updates[el.id] = { y: bottommost - el.height };
        });
        break;
    }

    Object.entries(updates).forEach(([id, update]) => {
      dispatch({ type: 'UPDATE_ELEMENT', id, updates: update });
    });
  };

  if (selectedElements.length < 2) {
    return (
      <Card className="border-none shadow-lg bg-gradient-to-br from-white to-blue-50/30">
        <CardHeader className="pb-4">
          <CardTitle className="text-sm flex items-center text-gray-700">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
              <AlignCenter className="w-4 h-4 text-blue-600" />
            </div>
            Alignment Tools
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500 text-center">
            Select 2 or more elements to use alignment tools
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-none shadow-lg bg-gradient-to-br from-white to-blue-50/30">
      <CardHeader className="pb-4">
        <CardTitle className="text-sm flex items-center text-gray-700">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
            <AlignCenter className="w-4 h-4 text-blue-600" />
          </div>
          Align {selectedElements.length} Elements
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="text-xs font-semibold text-gray-600 mb-2">Horizontal</h4>
          <div className="grid grid-cols-3 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => alignElements('left')}
              className="bg-white/80 border-blue-200 hover:bg-blue-50"
            >
              <AlignLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => alignElements('center')}
              className="bg-white/80 border-blue-200 hover:bg-blue-50"
            >
              <AlignCenter className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => alignElements('right')}
              className="bg-white/80 border-blue-200 hover:bg-blue-50"
            >
              <AlignRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-semibold text-gray-600 mb-2">Vertical</h4>
          <div className="grid grid-cols-3 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => alignElements('top')}
              className="bg-white/80 border-blue-200 hover:bg-blue-50"
            >
              <AlignVerticalJustifyStart className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => alignElements('middle')}
              className="bg-white/80 border-blue-200 hover:bg-blue-50"
            >
              <AlignVerticalJustifyCenter className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => alignElements('bottom')}
              className="bg-white/80 border-blue-200 hover:bg-blue-50"
            >
              <AlignVerticalJustifyEnd className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AlignmentTools;
