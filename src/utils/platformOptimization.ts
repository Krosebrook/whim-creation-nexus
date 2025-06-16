
import { DesignElement } from '@/contexts/DesignContext';

export const optimizeForPlatform = (elements: DesignElement[], platform: string): DesignElement[] => {
  switch (platform) {
    case 'amazon':
      // Amazon prefers simpler designs with high contrast
      return elements.map(el => ({
        ...el,
        opacity: Math.max(el.opacity, 0.8),
        color: el.color === '#FFFFFF' ? '#000000' : el.color
      }));
    
    case 'printify':
      // Printify works well with colorful, detailed designs
      return elements;
    
    case 'shopify':
      // Shopify stores benefit from branded, professional designs
      return elements.map(el => ({
        ...el,
        fontSize: el.fontSize ? Math.min(el.fontSize, 28) : el.fontSize
      }));
    
    default:
      return elements;
  }
};
