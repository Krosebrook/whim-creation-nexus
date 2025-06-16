
import React from 'react';
import { useDesign } from '@/contexts/DesignContext';
import { Palette, Move, RotateCw } from 'lucide-react';

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

  const renderElement = (element: any) => {
    const isSelected = state.selectedElement === element.id;
    const baseStyle: React.CSSProperties = {
      position: 'absolute',
      left: element.x,
      top: element.y,
      width: element.width,
      height: element.height,
      transform: `rotate(${element.rotation}deg)`,
      opacity: element.opacity,
      cursor: 'pointer',
      border: isSelected ? '2px solid #8b5cf6' : 'none',
      borderRadius: isSelected ? '4px' : '0',
      boxShadow: isSelected ? '0 0 0 2px rgba(139, 92, 246, 0.2)' : 'none',
    };

    switch (element.type) {
      case 'text':
        return (
          <div
            key={element.id}
            style={{
              ...baseStyle,
              color: element.color,
              fontSize: element.fontSize,
              fontFamily: element.fontFamily,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '500',
            }}
            onClick={() => handleElementClick(element.id)}
          >
            {element.content}
          </div>
        );
      case 'shape':
        let shapeStyle: React.CSSProperties = { ...baseStyle, backgroundColor: element.color };
        if (element.shapeType === 'circle') {
          shapeStyle.borderRadius = '50%';
        } else if (element.shapeType === 'triangle') {
          shapeStyle = {
            ...baseStyle,
            backgroundColor: 'transparent',
            borderLeft: `${element.width / 2}px solid transparent`,
            borderRight: `${element.width / 2}px solid transparent`,
            borderBottom: `${element.height}px solid ${element.color}`,
            width: 0,
            height: 0,
          };
        }
        return (
          <div
            key={element.id}
            style={shapeStyle}
            onClick={() => handleElementClick(element.id)}
          />
        );
      case 'pattern':
        let patternStyle: React.CSSProperties = { ...baseStyle };
        if (element.patternType === 'stripes') {
          patternStyle.background = `repeating-linear-gradient(45deg, ${element.color}, ${element.color} 10px, transparent 10px, transparent 20px)`;
        } else if (element.patternType === 'dots') {
          patternStyle.background = `radial-gradient(circle, ${element.color} 2px, transparent 2px)`;
          patternStyle.backgroundSize = '20px 20px';
        } else if (element.patternType === 'gradient') {
          patternStyle.background = `linear-gradient(45deg, ${element.color}, #ffffff)`;
        }
        return (
          <div
            key={element.id}
            style={patternStyle}
            onClick={() => handleElementClick(element.id)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden border-l border-slate-300/50">
      {/* Canvas Header */}
      <div className="bg-white/90 backdrop-blur-sm border-b border-slate-200/50 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 bg-red-400 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
          <div className="w-3 h-3 bg-green-400 rounded-full"></div>
          <span className="ml-4 text-sm font-medium text-slate-600">Design Canvas</span>
        </div>
        <div className="flex items-center space-x-2 text-xs text-slate-500">
          <Palette className="w-4 h-4" />
          <span>{state.elements.length} elements</span>
        </div>
      </div>

      {/* Canvas Area */}
      <div
        className="w-full h-full bg-white relative shadow-inner"
        onClick={handleCanvasClick}
        style={{ 
          minHeight: '600px',
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0,0,0,.05) 1px, transparent 0)',
          backgroundSize: '20px 20px'
        }}
      >
        {/* Canvas Guidelines */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-0 right-0 h-px bg-blue-200/50"></div>
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-blue-200/50"></div>
        </div>

        {/* Elements */}
        {state.elements.map(renderElement)}

        {/* Empty State */}
        {state.elements.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center">
                <Palette className="w-10 h-10 text-purple-500" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-slate-700">Start Creating</h3>
                <p className="text-sm text-slate-500 max-w-xs">
                  Select a product category from the sidebar to begin designing your print-on-demand product.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DesignCanvas;
