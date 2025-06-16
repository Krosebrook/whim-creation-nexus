
import { DesignElement } from './design';

export interface ProductTemplate {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  canvasSize: { width: number; height: number };
  elements: Partial<DesignElement>[];
  description: string;
  platforms: string[];
}

export type ProductCategory = 'apparel' | 'accessories' | 'home' | 'stationery';
export type Platform = 'printify' | 'amazon' | 'shopify' | 'canva';
