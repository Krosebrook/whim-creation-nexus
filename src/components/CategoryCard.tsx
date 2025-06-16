
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
      className={`bg-slate-800/50 border-slate-600 hover:border-purple-400 transition-all duration-300 cursor-pointer ${
        isSelected ? 'border-purple-400 bg-slate-800/80' : ''
      }`}
      onClick={() => onToggleCategory(category.id)}
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
