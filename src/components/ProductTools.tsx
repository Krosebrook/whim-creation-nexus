
import React from 'react';
import ProductCategorySelector from './ProductCategorySelector';

interface ProductToolsProps {
  onSelectProduct: (category: string, subcategory: string) => void;
}

const ProductTools: React.FC<ProductToolsProps> = ({ onSelectProduct }) => {
  return <ProductCategorySelector onSelectProduct={onSelectProduct} />;
};

export default ProductTools;
