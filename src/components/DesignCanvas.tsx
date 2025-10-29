
import React from 'react';
import { useDesign } from '@/contexts/DesignContext';
import CanvasHeader from './CanvasHeader';
import CanvasEmptyState from './CanvasEmptyState';
import ElementRenderer from './ElementRenderer';

const DesignCanvas: React.FC = () => {
  const { state, dispatch } = useDesign();

  const handleElementClick = (elementId: string) => {
    dispatch({ type: 'SELECT_ELEMENT', id: elementId });
  };

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      dispatch({ type: 'SELECT_ELEMENT', id: null });
    }
  };

  return (
    <div className="flex-1 bg-gradient-to-br from-slate-50 to-slate-100/60 relative overflow-hidden flex flex-col">
      <CanvasHeader elementCount={state.elements.length} />

      {/* Canvas Area */}
      <div className="flex-1 p-2 sm:p-4 md:p-6 lg:p-8 flex items-center justify-center overflow-auto">
        <div
          className="bg-background relative shadow-2xl rounded-xl md:rounded-2xl border border-border/60 overflow-hidden w-full max-w-[95vw] md:max-w-4xl aspect-[4/3]"
          onClick={handleCanvasClick}
          style={{ 
            maxHeight: 'calc(100vh - 120px)',
            backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--primary) / 0.08) 1px, transparent 0)',
            backgroundSize: '24px 24px'
          }}
        >
          {/* Canvas Guidelines */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-0 right-0 h-px bg-primary/20"></div>
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-primary/20"></div>
          </div>

          {/* Elements */}
          {state.elements.map(element => (
            <ElementRenderer
              key={element.id}
              element={element}
              isSelected={state.selectedElement === element.id}
              onElementClick={handleElementClick}
            />
          ))}

          {/* Empty State */}
          {state.elements.length === 0 && <CanvasEmptyState />}
        </div>
      </div>
    </div>
  );
};

export default DesignCanvas;
