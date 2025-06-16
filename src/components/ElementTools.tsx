
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
  Star,
  Wand2
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
      color: '#1f2937',
      fontSize: 24,
      fontFamily: 'Inter, system-ui, sans-serif',
    };
    
    dispatch({ type: 'ADD_ELEMENT', element });
    setTextInput('');
  };

  const addShapeElement = (shapeType: 'rectangle' | 'circle' | 'triangle' | 'star') => {
    const colors = ['#6366f1', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    const element = {
      id: generateId(),
      type: 'shape' as const,
      x: 150,
      y: 150,
      width: 100,
      height: 100,
      rotation: 0,
      opacity: 1,
      color: randomColor,
      shapeType,
    };
    
    dispatch({ type: 'ADD_ELEMENT', element });
  };

  const addPatternElement = (patternType: 'stripes' | 'dots' | 'gradient') => {
    const colors = ['#6366f1', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    const element = {
      id: generateId(),
      type: 'pattern' as const,
      x: 200,
      y: 200,
      width: 150,
      height: 150,
      rotation: 0,
      opacity: 1,
      color: randomColor,
      patternType,
    };
    
    dispatch({ type: 'ADD_ELEMENT', element });
  };

  return (
    <div className="space-y-6">
      {/* Text Tools */}
      <Card className="border-none shadow-lg bg-gradient-to-br from-white to-green-50/30">
        <CardHeader className="pb-4">
          <CardTitle className="text-sm flex items-center text-gray-700">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
              <Type className="w-4 h-4 text-green-600" />
            </div>
            Add Text
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Type your text here..."
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            className="bg-white/80 border-green-200 text-gray-700 placeholder:text-gray-400 focus:border-green-300 focus:ring-green-200"
            onKeyPress={(e) => e.key === 'Enter' && addTextElement()}
          />
          <Button 
            onClick={addTextElement} 
            disabled={!textInput.trim()}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-md disabled:opacity-50"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Text Element
          </Button>
        </CardContent>
      </Card>

      {/* Shape Tools */}
      <Card className="border-none shadow-lg bg-gradient-to-br from-white to-purple-50/30">
        <CardHeader className="pb-4">
          <CardTitle className="text-sm flex items-center text-gray-700">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
              <Square className="w-4 h-4 text-purple-600" />
            </div>
            Add Shapes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {[
              { type: 'rectangle', icon: Square, label: 'Rectangle' },
              { type: 'circle', icon: Circle, label: 'Circle' },
              { type: 'triangle', icon: Triangle, label: 'Triangle' },
              { type: 'star', icon: Star, label: 'Star' }
            ].map(({ type, icon: Icon, label }) => (
              <Button
                key={type}
                variant="outline"
                onClick={() => addShapeElement(type as any)}
                className="h-16 bg-white/80 border-purple-200 hover:bg-purple-50 hover:border-purple-300 flex-col space-y-1 transition-all duration-200"
              >
                <Icon className="w-5 h-5 text-purple-600" />
                <span className="text-xs text-gray-600">{label}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Pattern Tools */}
      <Card className="border-none shadow-lg bg-gradient-to-br from-white to-orange-50/30">
        <CardHeader className="pb-4">
          <CardTitle className="text-sm flex items-center text-gray-700">
            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
              <Palette className="w-4 h-4 text-orange-600" />
            </div>
            Add Patterns
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { type: 'stripes', label: 'Diagonal Stripes', gradient: 'from-orange-400 to-red-500' },
              { type: 'dots', label: 'Polka Dots', gradient: 'from-blue-400 to-cyan-500' },
              { type: 'gradient', label: 'Color Gradient', gradient: 'from-purple-400 to-pink-500' }
            ].map(({ type, label, gradient }) => (
              <Button
                key={type}
                variant="outline"
                onClick={() => addPatternElement(type as any)}
                className="w-full bg-white/80 border-orange-200 hover:bg-orange-50 hover:border-orange-300 justify-start transition-all duration-200"
              >
                <div className={`w-4 h-4 mr-3 bg-gradient-to-r ${gradient} rounded`}></div>
                <span className="text-gray-700">{label}</span>
                <Wand2 className="w-3 h-3 ml-auto text-orange-500" />
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ElementTools;
