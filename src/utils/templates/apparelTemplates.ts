
import { ProductTemplate } from '@/types/template';

export const apparelTemplates: ProductTemplate[] = [
  {
    id: 'tshirt-vintage',
    name: 'Vintage T-Shirt Design',
    category: 'apparel',
    subcategory: 'tshirts',
    canvasSize: { width: 300, height: 350 },
    description: 'Classic vintage-style t-shirt design with distressed text',
    platforms: ['Printify', 'Amazon Merch', 'Shopify'],
    elements: [
      {
        type: 'text',
        content: 'VINTAGE',
        x: 75,
        y: 100,
        width: 150,
        height: 40,
        fontSize: 32,
        fontFamily: 'serif',
        color: '#8B4513',
        rotation: -2
      },
      {
        type: 'text',
        content: 'COLLECTION',
        x: 50,
        y: 150,
        width: 200,
        height: 25,
        fontSize: 16,
        fontFamily: 'sans-serif',
        color: '#654321',
        rotation: 0
      }
    ]
  },
  {
    id: 'hoodie-minimalist',
    name: 'Minimalist Hoodie',
    category: 'apparel',
    subcategory: 'hoodies',
    canvasSize: { width: 280, height: 320 },
    description: 'Clean, minimalist hoodie design perfect for modern brands',
    platforms: ['Printify', 'Amazon', 'Shopify'],
    elements: [
      {
        type: 'shape',
        shapeType: 'circle',
        x: 115,
        y: 120,
        width: 50,
        height: 50,
        color: '#000000',
        opacity: 0.8
      },
      {
        type: 'text',
        content: 'MINIMAL',
        x: 90,
        y: 180,
        width: 100,
        height: 20,
        fontSize: 14,
        fontFamily: 'sans-serif',
        color: '#333333'
      }
    ]
  }
];
