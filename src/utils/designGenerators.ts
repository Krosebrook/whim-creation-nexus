
// Main design generators - now using individual generator modules
export { generateApparelDesign } from './generators/apparelGenerator';
export { generateAccessoryDesign } from './generators/accessoryGenerator';
export { generateHomeDesign } from './generators/homeGenerator';
export { generateStationeryDesign } from './generators/stationeryGenerator';
export { buildElementsFromTemplate, createRandomElement } from './generators/elementBuilder';
export { optimizeForPlatform } from './platformOptimization';
export { getAllTemplates } from './getAllTemplates';
