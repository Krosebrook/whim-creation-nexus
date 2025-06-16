
import { DesignElement } from '@/contexts/DesignContext';
import { generateId } from '../idGenerator';
import { accessoryTemplates } from '../templateData';
import { createFallbackDesigns } from '../fallbackDesigns';

export const generateAccessoryDesign = (subcategory: string): DesignElement[] => {
  const templates = accessoryTemplates.filter(t => t.subcategory === subcategory);
  
  if (templates.length === 0) {
    return createFallbackDesigns.accessories(subcategory);
  }
  
  const template = templates[Math.floor(Math.random() * templates.length)];
  
  return template.elements.map(el => ({
    id: generateId(),
    type: el.type || 'text',
    x: el.x || 100,
    y: el.y || 100,
    width: el.width || 100,
    height: el.height || 50,
    rotation: el.rotation || 0,
    opacity: el.opacity || 1,
    ...el
  })) as DesignElement[];
};
