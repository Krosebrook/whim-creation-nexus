
import { ProductTemplate } from '@/types/template';

// Core Apparel Templates
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

// Accessories Templates
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

// Home & Living Templates
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

// Stationery Templates
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

export const getAllTemplates = (): ProductTemplate[] => {
  return [...apparelTemplates, ...accessoryTemplates, ...homeTemplates, ...stationeryTemplates];
};
