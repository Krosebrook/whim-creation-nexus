
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, Sparkles, Zap, CheckCircle, FileImage, FileText, Palette } from 'lucide-react';
import { useDesign } from '@/contexts/DesignContext';
import { optimizeForPlatform } from '@/utils/designGenerators';

const PlatformTools: React.FC = () => {
  const { state, dispatch } = useDesign();
  const [selectedPlatform, setSelectedPlatform] = useState('printify');
  const [exportFormat, setExportFormat] = useState('png');

  const handleOptimize = () => {
    const optimized = optimizeForPlatform(state.elements, selectedPlatform);
    dispatch({ type: 'CLEAR_CANVAS' });
    optimized.forEach(element => {
      dispatch({ type: 'ADD_ELEMENT', element });
    });
  };

  const handleExport = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = state.canvasWidth;
    canvas.height = state.canvasHeight;
    
    if (ctx) {
      // Fill background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Export as image
      const link = document.createElement('a');
      link.download = `design.${exportFormat}`;
      link.href = canvas.toDataURL(`image/${exportFormat}`);
      link.click();
    }
  };

  const exportAsJSON = () => {
    const designData = {
      version: '1.0',
      canvas: {
        width: state.canvasWidth,
        height: state.canvasHeight,
      },
      elements: state.elements,
      metadata: {
        exportedAt: new Date().toISOString(),
        platform: selectedPlatform,
        elementCount: state.elements.length,
      }
    };

    const blob = new Blob([JSON.stringify(designData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'design.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const exportAsCSS = () => {
    let cssCode = '/* Generated CSS from Design Tool */\n\n';
    cssCode += '.design-container {\n';
    cssCode += `  width: ${state.canvasWidth}px;\n`;
    cssCode += `  height: ${state.canvasHeight}px;\n`;
    cssCode += '  position: relative;\n';
    cssCode += '  background: white;\n';
    cssCode += '}\n\n';

    state.elements.forEach((element, index) => {
      cssCode += `.element-${index + 1} {\n`;
      cssCode += `  position: absolute;\n`;
      cssCode += `  left: ${element.x}px;\n`;
      cssCode += `  top: ${element.y}px;\n`;
      cssCode += `  width: ${element.width}px;\n`;
      cssCode += `  height: ${element.height}px;\n`;
      cssCode += `  transform: rotate(${element.rotation}deg);\n`;
      cssCode += `  opacity: ${element.opacity};\n`;
      
      if (element.type === 'text') {
        cssCode += `  color: ${element.color};\n`;
        cssCode += `  font-size: ${element.fontSize}px;\n`;
        cssCode += `  font-family: ${element.fontFamily};\n`;
      } else {
        cssCode += `  background-color: ${element.color};\n`;
      }
      
      cssCode += '}\n\n';
    });

    const blob = new Blob([cssCode], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'design.css';
    link.click();
    URL.revokeObjectURL(url);
  };

  const platformInfo = {
    printify: { 
      tip: '🎨 Colorful, detailed designs recommended',
      color: 'from-green-500 to-emerald-600',
      bgColor: 'from-white to-green-50/30'
    },
    amazon: { 
      tip: '✨ High contrast designs work best',
      color: 'from-orange-500 to-amber-600',
      bgColor: 'from-white to-orange-50/30'
    },
    shopify: { 
      tip: '🏪 Professional, branded designs preferred',
      color: 'from-blue-500 to-cyan-600',
      bgColor: 'from-white to-blue-50/30'
    },
    canva: { 
      tip: '📐 Template-friendly designs perform well',
      color: 'from-purple-500 to-violet-600',
      bgColor: 'from-white to-purple-50/30'
    }
  };

  const currentPlatform = platformInfo[selectedPlatform as keyof typeof platformInfo];

  return (
    <div className="space-y-6">
      <Card className={`border-none shadow-lg bg-gradient-to-br ${currentPlatform.bgColor}`}>
        <CardHeader className="pb-4">
          <CardTitle className="text-sm flex items-center text-gray-700">
            <div className="w-8 h-8 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-lg flex items-center justify-center mr-3">
              <Download className="w-4 h-4 text-indigo-600" />
            </div>
            Platform Export
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label className="text-gray-600 text-sm font-medium mb-2 block">Target Platform</Label>
            <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
              <SelectTrigger className="bg-white/80 border-gray-200 text-gray-700 focus:border-indigo-300 focus:ring-indigo-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-200">
                <SelectItem value="printify">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    Printify
                  </div>
                </SelectItem>
                <SelectItem value="amazon">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
                    Amazon Merch
                  </div>
                </SelectItem>
                <SelectItem value="shopify">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                    Shopify
                  </div>
                </SelectItem>
                <SelectItem value="canva">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                    Canva
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="p-4 bg-white/60 rounded-xl border border-gray-200/50">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-indigo-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Platform Tip</p>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {currentPlatform.tip}
                </p>
              </div>
            </div>
          </div>
          
          <Button 
            onClick={handleOptimize}
            className={`w-full bg-gradient-to-r ${currentPlatform.color} hover:shadow-lg text-white shadow-md transition-all duration-200`}
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Optimize for {selectedPlatform}
          </Button>
        </CardContent>
      </Card>

      {/* Export Options */}
      <Card className="border-none shadow-lg bg-gradient-to-br from-white to-gray-50/30">
        <CardHeader className="pb-4">
          <CardTitle className="text-sm flex items-center text-gray-700">
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
              <Zap className="w-4 h-4 text-gray-600" />
            </div>
            Export Options
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-gray-600 text-sm font-medium mb-2 block">Export Format</Label>
            <Select value={exportFormat} onValueChange={setExportFormat}>
              <SelectTrigger className="bg-white/80 border-gray-200 text-gray-700">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="png">PNG Image</SelectItem>
                <SelectItem value="jpeg">JPEG Image</SelectItem>
                <SelectItem value="svg">SVG Vector</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 gap-3">
            <Button 
              onClick={handleExport}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-md"
            >
              <FileImage className="w-4 h-4 mr-2" />
              Export as {exportFormat.toUpperCase()}
            </Button>
            
            <Button 
              onClick={exportAsJSON}
              variant="outline"
              className="w-full bg-white/80 border-gray-200 hover:bg-gray-50 text-gray-700"
            >
              <FileText className="w-4 h-4 mr-2" />
              Export as JSON
            </Button>
            
            <Button 
              onClick={exportAsCSS}
              variant="outline"
              className="w-full bg-white/80 border-gray-200 hover:bg-gray-50 text-gray-700"
            >
              <Palette className="w-4 h-4 mr-2" />
              Export as CSS
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlatformTools;
