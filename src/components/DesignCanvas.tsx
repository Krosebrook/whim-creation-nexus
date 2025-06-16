
import React from 'react';
import { useDesign } from '@/contexts/DesignContext';

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
    const baseStyle = {
      position: 'absolute' as const,
      left: element.x,
      top: element.y,
      width: element.width,
      height: element.height,
      transform: `rotate(${element.rotation}deg)`,
      opacity: element.opacity,
      cursor: 'pointer',
      border: isSelected ? '2px solid #8b5cf6' : 'none',
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
            }}
            onClick={() => handleElementClick(element.id)}
          >
            {element.content}
          </div>
        );
      case 'shape':
        let shapeStyle = { ...baseStyle, backgroundColor: element.color };
        if (element.shapeType === 'circle') {
          shapeStyle.borderRadius = '50%';
        } else if (element.shapeType === 'triangle') {
          shapeStyle.backgroundColor = 'transparent';
          shapeStyle.borderLeft = `${element.width / 2}px solid transparent`;
          shapeStyle.borderRight = `${element.width / 2}px solid transparent`;
          shapeStyle.borderBottom = `${element.height}px solid ${element.color}`;
          shapeStyle.width = 0;
          shapeStyle.height = 0;
        }
        return (
          <div
            key={element.id}
            style={shapeStyle}
            onClick={() => handleElementClick(element.id)}
          />
        );
      case 'pattern':
        let patternStyle = { ...baseStyle };
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
    <div className="flex-1 bg-white relative overflow-hidden">
      <div
        className="w-full h-full bg-gray-50 relative"
        onClick={handleCanvasClick}
        style={{ minHeight: '600px' }}
      >
        {state.elements.map(renderElement)}
      </div>
    </div>
  );
};

export default DesignCanvas;
