
import { ProductTemplate } from '@/types/template';

export const stationeryTemplates: ProductTemplate[] = [
  {
    id: 'journal-productivity',
    name: 'Productivity Journal',
    category: 'stationery',
    subcategory: 'journals',
    canvasSize: { width: 240, height: 320 },
    description: 'Goal-oriented productivity journal cover',
    platforms: ['Printify', 'Shopify', 'Canva'],
    elements: [
      {
        type: 'text',
        content: 'GOALS',
        x: 80,
        y: 80,
        width: 80,
        height: 40,
        fontSize: 24,
        fontFamily: 'sans-serif',
        color: '#4169E1'
      },
      {
        type: 'text',
        content: '& DREAMS',
        x: 70,
        y: 120,
        width: 100,
        height: 25,
        fontSize: 16,
        fontFamily: 'sans-serif',
        color: '#1E90FF'
      },
      {
        type: 'shape',
        shapeType: 'rectangle',
        x: 60,
        y: 160,
        width: 120,
        height: 2,
        color: '#4169E1'
      }
    ]
  }
];
