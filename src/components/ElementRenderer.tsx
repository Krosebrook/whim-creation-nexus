
import React from 'react';
import { DesignElement } from '@/types/design';

interface ElementRendererProps {
  element: DesignElement;
  isSelected: boolean;
  onElementClick: (elementId: string) => void;
}

const ElementRenderer: React.FC<ElementRendererProps> = ({ element, isSelected, onElementClick }) => {
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

  const renderTextElement = () => (
    <div
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
      onClick={() => onElementClick(element.id)}
    >
      {element.content}
    </div>
  );

  const renderShapeElement = () => {
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
        style={shapeStyle}
        onClick={() => onElementClick(element.id)}
      />
    );
  };

  const renderPatternElement = () => {
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
        style={patternStyle}
        onClick={() => onElementClick(element.id)}
      />
    );
  };

  switch (element.type) {
    case 'text':
      return renderTextElement();
    case 'shape':
      return renderShapeElement();
    case 'pattern':
      return renderPatternElement();
    default:
      return null;
  }
};

export default ElementRenderer;
