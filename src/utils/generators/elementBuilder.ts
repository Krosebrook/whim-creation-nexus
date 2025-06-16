
import { DesignElement } from '@/contexts/DesignContext';
import { generateId } from '../idGenerator';
import { ProductTemplate } from '@/types/template';

export const buildElementsFromTemplate = (template: ProductTemplate): DesignElement[] => {
  return template.elements.map(el => ({
    id: generateId(),
    type: el.type || 'text',
    x: el.x || 100,
    y: el.y || 100,
    width: el.width || 100,
    height: el.height || 50,
    rotation: el.rotation || 0,
    opacity: el.opacity || 1,
    color: el.color || '#000000',
    ...el
  })) as DesignElement[];
};

export const createRandomElement = (type: 'text' | 'shape' | 'pattern'): DesignElement => {
  const colors = ['#6366f1', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  
  const baseElement = {
    id: generateId(),
    type,
    x: Math.random() * 200 + 50,
    y: Math.random() * 200 + 50,
    width: 100,
    height: 50,
    rotation: 0,
    opacity: 1,
    color: randomColor,
  };

  if (type === 'text') {
    return {
      ...baseElement,
      content: 'Sample Text',
      fontSize: 24,
      fontFamily: 'Arial',
    };
  }

  if (type === 'shape') {
    return {
      ...baseElement,
      shapeType: 'rectangle',
    };
  }

  return {
    ...baseElement,
    patternType: 'dots',
  };
};
