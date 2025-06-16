
import { DesignElement } from '@/contexts/DesignContext';
import { generateId } from './idGenerator';

const colors = ['#000000', '#FFFFFF', '#FF6B6B', '#4ECDC4', '#45B7D1'];

const generateGenericApparelDesign = (subcategory: string): DesignElement[] => {
  const slogans = {
    tshirts: ['STYLE', 'FRESH', 'BOLD', 'UNIQUE'],
    hoodies: ['COMFORT', 'COZY', 'WARM', 'CHILL'],
    tanks: ['SUMMER', 'BEACH', 'ACTIVE', 'FREE'],
    kids: ['FUN', 'PLAY', 'SMILE', 'HAPPY']
  };
  
  const text = slogans[subcategory as keyof typeof slogans]?.[0] || 'DESIGN';
  
  return [{
    id: generateId(),
    type: 'text',
    content: text,
    x: 100,
    y: 150,
    width: 200,
    height: 50,
    rotation: 0,
    opacity: 1,
    color: colors[Math.floor(Math.random() * colors.length)],
    fontSize: 32,
    fontFamily: 'Arial'
  }];
};

const generateGenericAccessoryDesign = (subcategory: string): DesignElement[] => {
  return [{
    id: generateId(),
    type: 'shape',
    shapeType: 'circle',
    x: 125,
    y: 125,
    width: 50,
    height: 50,
    rotation: 0,
    opacity: 1,
    color: '#8B5CF6'
  }];
};

const generateGenericHomeDesign = (subcategory: string): DesignElement[] => {
  const homeText = {
    mugs: 'COFFEE TIME',
    pillows: 'HOME',
    posters: 'INSPIRE',
    stickers: 'DECOR'
  };
  
  return [{
    id: generateId(),
    type: 'text',
    content: homeText[subcategory as keyof typeof homeText] || 'HOME',
    x: 75,
    y: 100,
    width: 150,
    height: 40,
    rotation: 0,
    opacity: 1,
    color: '#2D3748',
    fontSize: 24,
    fontFamily: 'Arial'
  }];
};

const generateGenericStationeryDesign = (subcategory: string): DesignElement[] => {
  return [{
    id: generateId(),
    type: 'text',
    content: 'NOTES',
    x: 90,
    y: 120,
    width: 120,
    height: 30,
    rotation: 0,
    opacity: 1,
    color: '#4A5568',
    fontSize: 20,
    fontFamily: 'Arial'
  }];
};

export const createFallbackDesigns = {
  apparel: generateGenericApparelDesign,
  accessories: generateGenericAccessoryDesign,
  home: generateGenericHomeDesign,
  stationery: generateGenericStationeryDesign
};
