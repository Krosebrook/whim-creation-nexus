
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shirt, Package, Home, FileText, Smartphone, Coffee, Star } from 'lucide-react';

interface ProductCategory {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  subcategories: {
    id: string;
    name: string;
    description: string;
    platforms: string[];
    popularity: 'high' | 'medium' | 'low';
  }[];
}

interface ProductCategorySelectorProps {
  onSelectProduct: (category: string, subcategory: string) => void;
}

const ProductCategorySelector: React.FC<ProductCategorySelectorProps> = ({ onSelectProduct }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories: ProductCategory[] = [
    {
      id: 'apparel',
      name: 'Core Apparel',
      icon: Shirt,
      subcategories: [
        {
          id: 'tshirts',
          name: 'T-Shirts (Short & Long Sleeve)',
          description: 'Universal bestseller across all platforms',
          platforms: ['Printify', 'Amazon Merch', 'Shopify', 'Canva'],
          popularity: 'high'
        },
        {
          id: 'hoodies',
          name: 'Hoodies & Sweatshirts',
          description: 'Seasonal comfort-focused bestseller',
          platforms: ['Printify', 'Amazon', 'Shopify'],
          popularity: 'high'
        },
        {
          id: 'tanks',
          name: 'Tank Tops',
          description: 'Summer and fitness brand essential',
          platforms: ['Printify', 'Amazon', 'Shopify'],
          popularity: 'medium'
        },
        {
          id: 'kids',
          name: 'Kids & Youth Apparel',
          description: 'Significant market segment for families',
          platforms: ['Printify', 'Amazon', 'Shopify'],
          popularity: 'high'
        }
      ]
    },
    {
      id: 'accessories',
      name: 'Accessories',
      icon: Package,
      subcategories: [
        {
          id: 'totes',
          name: 'Tote Bags',
          description: 'Eco-friendly impulse buy option',
          platforms: ['Printify', 'Shopify', 'Canva'],
          popularity: 'high'
        },
        {
          id: 'phone-cases',
          name: 'Phone Cases',
          description: 'Consistently in-demand tech personalization',
          platforms: ['Printify', 'Amazon', 'Shopify'],
          popularity: 'high'
        },
        {
          id: 'hats',
          name: 'Hats & Caps',
          description: 'Embroidered and printed headwear',
          platforms: ['Printify', 'Amazon', 'Shopify'],
          popularity: 'medium'
        },
        {
          id: 'socks',
          name: 'Socks',
          description: 'Fun and quirky creative designs',
          platforms: ['Printify', 'Shopify'],
          popularity: 'medium'
        }
      ]
    },
    {
      id: 'home',
      name: 'Home & Living',
      icon: Home,
      subcategories: [
        {
          id: 'mugs',
          name: 'Mugs',
          description: 'Classic gift item and bestseller',
          platforms: ['Printify', 'Amazon', 'Shopify', 'Canva'],
          popularity: 'high'
        },
        {
          id: 'pillows',
          name: 'Pillows & Pillow Covers',
          description: 'Popular home decor personalization',
          platforms: ['Printify', 'Shopify'],
          popularity: 'medium'
        },
        {
          id: 'posters',
          name: 'Posters & Wall Art',
          description: 'Broad category including canvases and tapestries',
          platforms: ['Printify', 'Amazon', 'Shopify'],
          popularity: 'high'
        },
        {
          id: 'stickers',
          name: 'Stickers & Decals',
          description: 'Low-cost, high-margin branding item',
          platforms: ['Printify', 'Shopify', 'Canva'],
          popularity: 'medium'
        }
      ]
    },
    {
      id: 'stationery',
      name: 'Stationery',
      icon: FileText,
      subcategories: [
        {
          id: 'journals',
          name: 'Notebooks & Journals',
          description: 'Spiral-bound and hardcover custom designs',
          platforms: ['Printify', 'Shopify', 'Canva'],
          popularity: 'medium'
        },
        {
          id: 'cards',
          name: 'Greeting Cards & Invitations',
          description: 'Seasonal and event-driven products',
          platforms: ['Printify', 'Shopify', 'Canva'],
          popularity: 'low'
        }
      ]
    }
  ];

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
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Choose Your Product Category</h2>
        <p className="text-gray-300">Select from proven print-on-demand product categories</p>
      </div>

      {/* Category Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((category) => {
          const IconComponent = category.icon;
          const isSelected = selectedCategory === category.id;
          
          return (
            <Card 
              key={category.id}
              className={`bg-slate-800/50 border-slate-600 hover:border-purple-400 transition-all duration-300 cursor-pointer ${
                isSelected ? 'border-purple-400 bg-slate-800/80' : ''
              }`}
              onClick={() => setSelectedCategory(isSelected ? null : category.id)}
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-white flex items-center">
                  <IconComponent className="w-5 h-5 mr-2 text-purple-400" />
                  {category.name}
                </CardTitle>
              </CardHeader>
              
              {isSelected && (
                <CardContent className="space-y-4">
                  {category.subcategories.map((subcategory) => (
                    <div 
                      key={subcategory.id}
                      className="p-4 bg-slate-700/50 rounded-lg border border-slate-600 hover:border-slate-500 transition-colors"
                    >
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
                        onClick={() => onSelectProduct(category.id, subcategory.id)}
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                        size="sm"
                      >
                        Create {subcategory.name} Design
                      </Button>
                    </div>
                  ))}
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>

      {/* Platform Information */}
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
    </div>
  );
};

export default ProductCategorySelector;
