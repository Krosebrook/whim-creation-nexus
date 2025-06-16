import React, { useState, useRef } from 'react';
import { DesignElement } from '@/types/design';
import { useDesign } from '@/contexts/DesignContext';
import { Image, ArrowRight, ArrowLeft, ArrowUp, ArrowDown, Pentagon, Octagon } from 'lucide-react';

interface ElementRendererProps {
  element: DesignElement;
  isSelected: boolean;
  onElementClick: (elementId: string, addToSelection?: boolean) => void;
}

const ElementRenderer: React.FC<ElementRendererProps> = ({ element, isSelected, onElementClick }) => {
  const { dispatch } = useDesign();
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const elementRef = useRef<HTMLDivElement>(null);

  // Don't render if element is hidden
  if (element.visible === false) {
    return null;
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({
      x: e.clientX - element.x,
      y: e.clientY - element.y
    });
    onElementClick(element.id, e.ctrlKey || e.metaKey);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    
    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;
    
    dispatch({
      type: 'UPDATE_ELEMENT',
      id: element.id,
      updates: { x: newX, y: newY }
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragStart]);

  const baseStyle: React.CSSProperties = {
    position: 'absolute',
    left: element.x,
    top: element.y,
    width: element.width,
    height: element.height,
    transform: `rotate(${element.rotation}deg)`,
    opacity: element.opacity,
    cursor: isDragging ? 'grabbing' : 'grab',
    border: isSelected ? '2px solid #6366f1' : 'none',
    borderRadius: isSelected ? '8px' : '0',
    boxShadow: isSelected ? '0 0 0 4px rgba(99, 102, 241, 0.1), 0 8px 25px -5px rgba(99, 102, 241, 0.25)' : 'none',
    transition: isDragging ? 'none' : 'all 0.2s ease-in-out',
    userSelect: 'none',
  };

  const renderTextElement = () => (
    <div
      ref={elementRef}
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
      onMouseDown={handleMouseDown}
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
        cursor: isDragging ? 'grabbing' : 'grab',
      };
    } else if (element.shapeType === 'diamond') {
      shapeStyle = {
        ...baseStyle,
        backgroundColor: element.color,
        transform: `rotate(45deg) rotate(${element.rotation}deg)`,
        borderRadius: '8px',
      };
    } else if (element.shapeType === 'heart') {
      shapeStyle = {
        ...baseStyle,
        backgroundColor: element.color,
        borderRadius: '50px 50px 0 0',
        transform: `rotate(-45deg) rotate(${element.rotation}deg)`,
      };
    } else if (element.shapeType === 'hexagon') {
      shapeStyle = {
        ...baseStyle,
        backgroundColor: element.color,
        clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
      };
    } else if (element.shapeType === 'pentagon') {
      shapeStyle = {
        ...baseStyle,
        backgroundColor: element.color,
        clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
      };
    } else if (element.shapeType === 'octagon') {
      shapeStyle = {
        ...baseStyle,
        backgroundColor: element.color,
        clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
      };
    } else if (element.shapeType?.includes('arrow')) {
      // Simplified arrow rendering - you could enhance this with SVG
      shapeStyle = {
        ...baseStyle,
        backgroundColor: element.color,
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      };
    } else if (element.shapeType === 'line') {
      shapeStyle.borderRadius = '4px';
    } else {
      shapeStyle.borderRadius = '8px';
    }

    return (
      <div
        ref={elementRef}
        style={shapeStyle}
        onMouseDown={handleMouseDown}
      >
        {element.shapeType?.includes('arrow') && (
          <div className="text-white font-bold">
            {element.shapeType === 'arrow-right' && '→'}
            {element.shapeType === 'arrow-left' && '←'}
            {element.shapeType === 'arrow-up' && '↑'}
            {element.shapeType === 'arrow-down' && '↓'}
          </div>
        )}
      </div>
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
    } else if (element.patternType === 'checkerboard') {
      patternStyle.background = `repeating-conic-gradient(${element.color} 0% 25%, transparent 0% 50%) 50% / 20px 20px`;
    } else if (element.patternType === 'waves') {
      patternStyle.background = `repeating-linear-gradient(90deg, ${element.color}, ${element.color} 10px, rgba(255,255,255,0.3) 10px, rgba(255,255,255,0.3) 20px)`;
    }

    return (
      <div
        ref={elementRef}
        style={patternStyle}
        onMouseDown={handleMouseDown}
      />
    );
  };

  const renderImageElement = () => (
    <div
      ref={elementRef}
      style={{
        ...baseStyle,
        backgroundColor: element.color,
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        border: '2px dashed #d1d5db',
      }}
      onMouseDown={handleMouseDown}
    >
      <Image className="w-8 h-8 text-gray-400 mb-2" />
      <span className="text-xs text-gray-500">{element.content}</span>
    </div>
  );

  switch (element.type) {
    case 'text':
      return renderTextElement();
    case 'shape':
      return renderShapeElement();
    case 'pattern':
      return renderPatternElement();
    case 'image':
      return renderImageElement();
    default:
      return null;
  }
};

export default ElementRenderer;
