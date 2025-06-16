
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';

const PlatformInfo: React.FC = () => {
  return (
    <Card className="bg-slate-800/30 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Star className="w-5 h-5 mr-2 text-yellow-400" />
          Platform Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex items-center">
              <Badge className="bg-green-100 text-green-800 mr-2">Printify</Badge>
              <span className="text-gray-300">Major fulfillment service with extensive catalog</span>
            </div>
            <div className="flex items-center">
              <Badge className="bg-orange-100 text-orange-800 mr-2">Amazon</Badge>
              <span className="text-gray-300">Direct marketplace with vast customer base</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center">
              <Badge className="bg-blue-100 text-blue-800 mr-2">Shopify</Badge>
              <span className="text-gray-300">E-commerce platform for branded storefronts</span>
            </div>
            <div className="flex items-center">
              <Badge className="bg-purple-100 text-purple-800 mr-2">Canva</Badge>
              <span className="text-gray-300">Design tool with direct print ordering</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlatformInfo;
