
import { ProductTemplate } from '@/types/template';
import { apparelTemplates } from './templates/apparelTemplates';
import { accessoryTemplates } from './templates/accessoryTemplates';
import { homeTemplates } from './templates/homeTemplates';
import { stationeryTemplates } from './templates/stationeryTemplates';

export const getAllTemplates = (): ProductTemplate[] => {
  return [...apparelTemplates, ...accessoryTemplates, ...homeTemplates, ...stationeryTemplates];
};
