
export interface DesignElement {
  id: string;
  type: 'text' | 'shape' | 'pattern';
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  opacity: number;
  color: string;
  content?: string;
  fontSize?: number;
  fontFamily?: string;
  shapeType?: 'rectangle' | 'circle' | 'triangle' | 'star';
  patternType?: 'stripes' | 'dots' | 'gradient';
}

export interface DesignState {
  elements: DesignElement[];
  selectedElement: string | null;
  canvasWidth: number;
  canvasHeight: number;
}

export interface CanvasSize {
  width: number;
  height: number;
}
