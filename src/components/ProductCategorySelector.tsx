
import React, { useState } from 'react';
import { Shirt, Package, Home, FileText } from 'lucide-react';
import { ProductCategory } from '@/types/product';
import CategoryCard from './CategoryCard';
import PlatformInfo from './PlatformInfo';

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

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategory(selectedCategory === categoryId ? null : categoryId);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Choose Your Product Category</h2>
        <p className="text-gray-300">Select from proven print-on-demand product categories</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            isSelected={selectedCategory === category.id}
            onToggleCategory={handleCategoryToggle}
            onSelectProduct={onSelectProduct}
          />
        ))}
      </div>

      <PlatformInfo />
    </div>
  );
};

export default ProductCategorySelector;
