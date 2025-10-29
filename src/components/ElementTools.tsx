
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
  Wand2,
  Image,
  Minus,
  Diamond,
  Heart,
  Hexagon,
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  Pentagon,
  Octagon
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

  const addShapeElement = (shapeType: 'rectangle' | 'circle' | 'triangle' | 'star' | 'line' | 'diamond' | 'heart' | 'hexagon' | 'arrow-right' | 'arrow-left' | 'arrow-up' | 'arrow-down' | 'pentagon' | 'octagon') => {
    const colors = ['#6366f1', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#14b8a6'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    const element = {
      id: generateId(),
      type: 'shape' as const,
      x: 150,
      y: 150,
      width: shapeType === 'line' ? 150 : 100,
      height: shapeType === 'line' ? 5 : 100,
      rotation: 0,
      opacity: 1,
      color: randomColor,
      shapeType,
    };
    
    dispatch({ type: 'ADD_ELEMENT', element });
  };

  const addPatternElement = (patternType: 'stripes' | 'dots' | 'gradient' | 'checkerboard' | 'waves') => {
    const colors = ['#6366f1', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#14b8a6'];
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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const imageUrl = event.target?.result as string;
      const img = new window.Image();
      
      img.onload = () => {
        const aspectRatio = img.width / img.height;
        const maxWidth = 300;
        const width = Math.min(maxWidth, img.width);
        const height = width / aspectRatio;
        
        const element = {
          id: generateId(),
          type: 'image' as const,
          x: 120,
          y: 120,
          width,
          height,
          rotation: 0,
          opacity: 1,
          color: '#ffffff',
          imageUrl,
        };
        
        dispatch({ type: 'ADD_ELEMENT', element });
      };
      
      img.src = imageUrl;
    };
    
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Text Tools */}
      <Card className="border-none shadow-md md:shadow-lg bg-gradient-to-br from-card to-accent/20">
        <CardHeader className="pb-3 md:pb-4">
          <CardTitle className="text-xs md:text-sm flex items-center text-foreground">
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
      <Card className="border-none shadow-md md:shadow-lg bg-gradient-to-br from-card to-accent/20">
        <CardHeader className="pb-3 md:pb-4">
          <CardTitle className="text-xs md:text-sm flex items-center text-foreground">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
              <Square className="w-4 h-4 text-purple-600" />
            </div>
            Add Shapes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 md:gap-2">
            {[
              { type: 'rectangle', icon: Square, label: 'Rectangle' },
              { type: 'circle', icon: Circle, label: 'Circle' },
              { type: 'triangle', icon: Triangle, label: 'Triangle' },
              { type: 'star', icon: Star, label: 'Star' },
              { type: 'diamond', icon: Diamond, label: 'Diamond' },
              { type: 'heart', icon: Heart, label: 'Heart' },
              { type: 'hexagon', icon: Hexagon, label: 'Hexagon' },
              { type: 'pentagon', icon: Pentagon, label: 'Pentagon' },
              { type: 'octagon', icon: Octagon, label: 'Octagon' },
              { type: 'arrow-right', icon: ArrowRight, label: 'Arrow →' },
              { type: 'arrow-left', icon: ArrowLeft, label: 'Arrow ←' },
              { type: 'arrow-up', icon: ArrowUp, label: 'Arrow ↑' },
              { type: 'arrow-down', icon: ArrowDown, label: 'Arrow ↓' },
              { type: 'line', icon: Minus, label: 'Line' }
            ].map(({ type, icon: Icon, label }) => (
              <Button
                key={type}
                variant="outline"
                onClick={() => addShapeElement(type as any)}
                className="h-12 bg-white/80 border-purple-200 hover:bg-purple-50 hover:border-purple-300 flex-col space-y-1 transition-all duration-200 text-xs"
              >
                <Icon className="w-4 h-4 text-purple-600" />
                <span className="text-xs text-gray-600 leading-none">{label}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Pattern Tools */}
      <Card className="border-none shadow-md md:shadow-lg bg-gradient-to-br from-card to-accent/20">
        <CardHeader className="pb-3 md:pb-4">
          <CardTitle className="text-xs md:text-sm flex items-center text-foreground">
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
              { type: 'gradient', label: 'Color Gradient', gradient: 'from-purple-400 to-pink-500' },
              { type: 'checkerboard', label: 'Checkerboard', gradient: 'from-gray-400 to-gray-600' },
              { type: 'waves', label: 'Wave Pattern', gradient: 'from-teal-400 to-blue-500' }
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

      {/* Image Tools */}
      <Card className="border-none shadow-md md:shadow-lg bg-gradient-to-br from-card to-accent/20">
        <CardHeader className="pb-3 md:pb-4">
          <CardTitle className="text-xs md:text-sm flex items-center text-foreground">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
              <Image className="w-4 h-4 text-blue-600" />
            </div>
            Add Images
          </CardTitle>
        </CardHeader>
        <CardContent>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="image-upload"
          />
          <label htmlFor="image-upload">
            <Button
              variant="outline"
              className="w-full bg-white/80 border-blue-200 hover:bg-blue-50 hover:border-blue-300 justify-start transition-all duration-200 cursor-pointer"
              asChild
            >
              <span>
                <Image className="w-4 h-4 mr-3 text-blue-600" />
                <span className="text-gray-700">Upload Image</span>
                <Plus className="w-3 h-3 ml-auto text-blue-500" />
              </span>
            </Button>
          </label>
        </CardContent>
      </Card>
    </div>
  );
};

export default ElementTools;
