
import React from 'react';

export interface Subcategory {
  id: string;
  name: string;
  description: string;
  platforms: string[];
  popularity: 'high' | 'medium' | 'low';
}

export interface ProductCategory {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  subcategories: Subcategory[];
}
