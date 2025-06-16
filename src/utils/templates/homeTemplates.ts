
import { ProductTemplate } from '@/types/template';

export const homeTemplates: ProductTemplate[] = [
  {
    id: 'mug-motivational',
    name: 'Motivational Mug',
    category: 'home',
    subcategory: 'mugs',
    canvasSize: { width: 280, height: 200 },
    description: 'Inspiring morning motivation mug design',
    platforms: ['Printify', 'Amazon', 'Shopify', 'Canva'],
    elements: [
      {
        type: 'text',
        content: 'BUT FIRST,',
        x: 70,
        y: 60,
        width: 140,
        height: 25,
        fontSize: 18,
        fontFamily: 'sans-serif',
        color: '#8B4513'
      },
      {
        type: 'text',
        content: 'COFFEE',
        x: 90,
        y: 90,
        width: 100,
        height: 35,
        fontSize: 28,
        fontFamily: 'serif',
        color: '#D2691E'
      }
    ]
  },
  {
    id: 'pillow-boho',
    name: 'Boho Pillow Design',
    category: 'home',
    subcategory: 'pillows',
    canvasSize: { width: 300, height: 300 },
    description: 'Bohemian-style decorative pillow pattern',
    platforms: ['Printify', 'Shopify'],
    elements: [
      {
        type: 'pattern',
        patternType: 'gradient',
        x: 50,
        y: 50,
        width: 200,
        height: 200,
        color: '#DEB887',
        opacity: 0.7
      },
      {
        type: 'shape',
        shapeType: 'star',
        x: 135,
        y: 135,
        width: 30,
        height: 30,
        color: '#8B4513',
        opacity: 0.8
      }
    ]
  }
];
