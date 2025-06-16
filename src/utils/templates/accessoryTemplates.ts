
import { ProductTemplate } from '@/types/template';

export const accessoryTemplates: ProductTemplate[] = [
  {
    id: 'tote-eco',
    name: 'Eco-Friendly Tote',
    category: 'accessories',
    subcategory: 'totes',
    canvasSize: { width: 320, height: 360 },
    description: 'Environmental awareness tote bag design',
    platforms: ['Printify', 'Shopify'],
    elements: [
      {
        type: 'text',
        content: 'ECO WARRIOR',
        x: 80,
        y: 120,
        width: 160,
        height: 30,
        fontSize: 24,
        fontFamily: 'sans-serif',
        color: '#228B22'
      },
      {
        type: 'pattern',
        patternType: 'dots',
        x: 50,
        y: 160,
        width: 220,
        height: 60,
        color: '#90EE90',
        opacity: 0.3
      }
    ]
  },
  {
    id: 'phone-case-geometric',
    name: 'Geometric Phone Case',
    category: 'accessories',
    subcategory: 'phone-cases',
    canvasSize: { width: 150, height: 300 },
    description: 'Modern geometric pattern for phone cases',
    platforms: ['Printify', 'Amazon', 'Shopify'],
    elements: [
      {
        type: 'shape',
        shapeType: 'triangle',
        x: 25,
        y: 50,
        width: 40,
        height: 40,
        color: '#FF6B6B',
        rotation: 30
      },
      {
        type: 'shape',
        shapeType: 'triangle',
        x: 85,
        y: 100,
        width: 40,
        height: 40,
        color: '#4ECDC4',
        rotation: -30
      }
    ]
  }
];
