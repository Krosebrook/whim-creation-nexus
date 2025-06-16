
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Subcategory } from '@/types/product';

interface SubcategoryItemProps {
  subcategory: Subcategory;
  categoryId: string;
  onSelectProduct: (category: string, subcategory: string) => void;
}

const SubcategoryItem: React.FC<SubcategoryItemProps> = ({
  subcategory,
  categoryId,
  onSelectProduct
}) => {
  const getPlatformColor = (platform: string) => {
    const colors = {
      'Printify': 'bg-green-100 text-green-800',
      'Amazon': 'bg-orange-100 text-orange-800',
      'Shopify': 'bg-blue-100 text-blue-800',
      'Canva': 'bg-purple-100 text-purple-800'
    };
    return colors[platform as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getPopularityColor = (popularity: string) => {
    const colors = {
      'high': 'bg-red-100 text-red-800',
      'medium': 'bg-yellow-100 text-yellow-800',
      'low': 'bg-gray-100 text-gray-800'
    };
    return colors[popularity as keyof typeof colors];
  };

  return (
    <div className="p-4 bg-slate-700/50 rounded-lg border border-slate-600 hover:border-slate-500 transition-colors">
      <div className="flex justify-between items-start mb-3">
        <h4 className="font-semibold text-white">{subcategory.name}</h4>
        <Badge className={getPopularityColor(subcategory.popularity)}>
          {subcategory.popularity}
        </Badge>
      </div>
      
      <p className="text-gray-300 text-sm mb-3">{subcategory.description}</p>
      
      <div className="flex flex-wrap gap-2 mb-3">
        {subcategory.platforms.map((platform) => (
          <Badge 
            key={platform}
            className={getPlatformColor(platform)}
          >
            {platform}
          </Badge>
        ))}
      </div>
      
      <Button 
        onClick={() => onSelectProduct(categoryId, subcategory.id)}
        className="w-full bg-purple-600 hover:bg-purple-700 text-white"
        size="sm"
      >
        Create {subcategory.name} Design
      </Button>
    </div>
  );
};

export default SubcategoryItem;
