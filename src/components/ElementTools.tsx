
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  Type, 
  Square, 
  Circle, 
  Triangle, 
  Palette, 
  Plus,
  Star
} from 'lucide-react';
import { useDesign } from '@/contexts/DesignContext';

const ElementTools: React.FC = () => {
  const { dispatch } = useDesign();
  const [textInput, setTextInput] = useState('');

  const generateId = () => Math.random().toString(36).substr(2, 9);

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

  return (
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
  );
};

export default ElementTools;
