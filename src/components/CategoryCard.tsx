
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProductCategory } from '@/types/product';
import SubcategoryItem from './SubcategoryItem';

interface CategoryCardProps {
  category: ProductCategory;
  isSelected: boolean;
  onToggleCategory: (categoryId: string) => void;
  onSelectProduct: (category: string, subcategory: string) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  isSelected,
  onToggleCategory,
  onSelectProduct
}) => {
  const IconComponent = category.icon;

  return (
    <Card 
      className={`bg-white/90 border-gray-300 hover:border-purple-400 transition-all duration-300 cursor-pointer shadow-lg ${
        isSelected ? 'border-purple-400 bg-white/95 shadow-xl' : ''
      }`}
      onClick={() => onToggleCategory(category.id)}
    >
      <CardHeader className="pb-3">
        <CardTitle className="text-gray-800 flex items-center font-semibold">
          <IconComponent className="w-5 h-5 mr-2 text-purple-600" />
          {category.name}
        </CardTitle>
      </CardHeader>
      
      {isSelected && (
        <CardContent className="space-y-4">
          {category.subcategories.map((subcategory) => (
            <SubcategoryItem
              key={subcategory.id}
              subcategory={subcategory}
              categoryId={category.id}
              onSelectProduct={onSelectProduct}
            />
          ))}
        </CardContent>
      )}
    </Card>
  );
};

export default CategoryCard;
