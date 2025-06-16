
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, Sparkles, Zap, CheckCircle } from 'lucide-react';
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

        <div className="pt-2 border-t border-gray-200/50">
          <Button 
            variant="outline"
            className="w-full bg-white/80 border-gray-200 hover:bg-gray-50 text-gray-700"
          >
            <Zap className="w-4 h-4 mr-2" />
            Export Design
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlatformTools;
