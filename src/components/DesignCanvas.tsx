import React from 'react';
import { useDesign } from '@/contexts/DesignContext';
import { Palette, Sparkles, Grid, Eye } from 'lucide-react';
import { designSystem } from '@/lib/design-system';

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
      border: isSelected ? '2px solid #6366f1' : 'none',
      borderRadius: isSelected ? '8px' : '0',
      boxShadow: isSelected ? '0 0 0 4px rgba(99, 102, 241, 0.1), 0 8px 25px -5px rgba(99, 102, 241, 0.25)' : 'none',
      transition: 'all 0.2s ease-in-out',
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
              fontWeight: '600',
              background: isSelected ? 'rgba(99, 102, 241, 0.03)' : 'transparent',
            }}
            onClick={() => handleElementClick(element.id)}
          >
            {element.content}
          </div>
        );
      case 'shape':
        let shapeStyle: React.CSSProperties = { 
          ...baseStyle, 
          backgroundColor: element.color,
          boxShadow: isSelected 
            ? '0 0 0 4px rgba(99, 102, 241, 0.1), 0 8px 25px -5px rgba(99, 102, 241, 0.25)' 
            : '0 2px 8px rgba(0, 0, 0, 0.1)'
        };
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
            boxShadow: isSelected 
              ? '0 0 0 4px rgba(99, 102, 241, 0.1)' 
              : '0 2px 8px rgba(0, 0, 0, 0.1)',
          };
        } else {
          shapeStyle.borderRadius = '8px';
        }
        return (
          <div
            key={element.id}
            style={shapeStyle}
            onClick={() => handleElementClick(element.id)}
          />
        );
      case 'pattern':
        let patternStyle: React.CSSProperties = { 
          ...baseStyle,
          borderRadius: '8px',
          overflow: 'hidden',
        };
        if (element.patternType === 'stripes') {
          patternStyle.background = `repeating-linear-gradient(45deg, ${element.color}, ${element.color} 10px, rgba(255,255,255,0.3) 10px, rgba(255,255,255,0.3) 20px)`;
        } else if (element.patternType === 'dots') {
          patternStyle.background = `radial-gradient(circle, ${element.color} 3px, transparent 3px)`;
          patternStyle.backgroundSize = '24px 24px';
        } else if (element.patternType === 'gradient') {
          patternStyle.background = `linear-gradient(135deg, ${element.color}, rgba(255,255,255,0.8))`;
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
    <div className="flex-1 bg-gradient-to-br from-slate-50 to-slate-100/60 relative overflow-hidden">
      {/* Canvas Header */}
      <div className="bg-white/90 backdrop-blur-md border-b border-gray-200/70 p-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
          </div>
          <div className="flex items-center space-x-2">
            <Eye className="w-4 h-4 text-gray-500" />
            <span className={designSystem.typography.subheading}>Design Canvas</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className={`flex items-center space-x-2 ${designSystem.typography.muted} bg-gradient-to-r from-gray-100 to-gray-50 px-3 py-1.5 rounded-full border border-gray-200/60`}>
            <Palette className="w-3.5 h-3.5" />
            <span className="font-medium">{state.elements.length} elements</span>
          </div>
          <div className={`flex items-center space-x-2 ${designSystem.typography.muted} bg-gradient-to-r from-gray-100 to-gray-50 px-3 py-1.5 rounded-full border border-gray-200/60`}>
            <Grid className="w-3.5 h-3.5" />
            <span className="font-medium">1200 × 800</span>
          </div>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="p-8 h-full flex items-center justify-center">
        <div
          className="bg-white relative shadow-2xl rounded-2xl border border-gray-200/60 overflow-hidden"
          onClick={handleCanvasClick}
          style={{ 
            width: '800px',
            height: '600px',
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(99, 102, 241, 0.08) 1px, transparent 0)',
            backgroundSize: '24px 24px'
          }}
        >
          {/* Canvas Guidelines */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-0 right-0 h-px bg-indigo-200/50"></div>
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-indigo-200/50"></div>
          </div>

          {/* Elements */}
          {state.elements.map(renderElement)}

          {/* Empty State */}
          {state.elements.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-6 max-w-sm">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center">
                  <Sparkles className="w-10 h-10 text-indigo-500" />
                </div>
                <div className="space-y-3">
                  <h3 className={`text-xl font-bold ${designSystem.typography.heading}`}>Ready to Create?</h3>
                  <p className={`${designSystem.typography.body} leading-relaxed`}>
                    Choose a product category from the sidebar to start designing your print-on-demand masterpiece.
                  </p>
                </div>
                <div className="flex items-center justify-center space-x-2 text-xs text-gray-400">
                  <div className="w-2 h-2 bg-indigo-200 rounded-full animate-pulse"></div>
                  <span>Waiting for your creativity</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DesignCanvas;
