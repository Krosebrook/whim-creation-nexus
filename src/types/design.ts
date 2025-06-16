
export interface DesignElement {
  id: string;
  type: 'text' | 'shape' | 'pattern' | 'image';
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
  shapeType?: 'rectangle' | 'circle' | 'triangle' | 'star' | 'line' | 'diamond' | 'heart' | 'hexagon' | 'arrow-right' | 'arrow-left' | 'arrow-up' | 'arrow-down' | 'pentagon' | 'octagon';
  patternType?: 'stripes' | 'dots' | 'gradient' | 'checkerboard' | 'waves';
  visible?: boolean;
}

export interface DesignState {
  elements: DesignElement[];
  selectedElement: string | null;
  selectedElements: string[];
  canvasWidth: number;
  canvasHeight: number;
}

export interface CanvasSize {
  width: number;
  height: number;
}
