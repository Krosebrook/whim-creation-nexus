
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, Sparkles } from 'lucide-react';
import { useDesign } from '@/contexts/DesignContext';
import { optimizeForPlatform } from '@/utils/designGenerators';

const PlatformTools: React.FC = () => {
  const { state, dispatch } = useDesign();
  const [selectedPlatform, setSelectedPlatform] = useState('printify');

  const handleOptimize = () => {
    const optimized = optimizeForPlatform(state.elements, selectedPlatform);
    dispatch({ type: 'CLEAR_CANVAS' });
    optimized.forEach(element => {
      dispatch({ type: 'ADD_ELEMENT', element });
    });
  };

  return (
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
          onClick={handleOptimize}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Sparkles className="w-4 h-4 mr-2" />
          Optimize for {selectedPlatform}
        </Button>
      </CardContent>
    </Card>
  );
};

export default PlatformTools;
