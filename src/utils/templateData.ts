
import { ProductTemplate } from '@/types/template';
import { apparelTemplates } from './templates/apparelTemplates';
import { accessoryTemplates } from './templates/accessoryTemplates';
import { homeTemplates } from './templates/homeTemplates';
import { stationeryTemplates } from './templates/stationeryTemplates';

// Re-export individual template arrays for backward compatibility
export { apparelTemplates, accessoryTemplates, homeTemplates, stationeryTemplates };

export const getAllTemplates = (): ProductTemplate[] => {
  return [...apparelTemplates, ...accessoryTemplates, ...homeTemplates, ...stationeryTemplates];
};
