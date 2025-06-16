
import React from 'react';
import { useDesign } from '@/contexts/DesignContext';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import DesignCanvas from './DesignCanvas';
import DesignTools from './DesignTools';

interface DesignAppProps {
  selectedCategory: string | null;
  onCategorySelect: (category: string) => void;
  onBackToCategories: () => void;
}

const DesignApp: React.FC<DesignAppProps> = ({ 
  selectedCategory, 
  onCategorySelect, 
  onBackToCategories 
}) => {
  const { undo, redo } = useDesign();

  // Setup keyboard shortcuts now that we're inside the provider
  useKeyboardShortcuts({
    onUndo: undo,
    onRedo: redo,
  });

  return (
    <div className="flex h-screen w-full">
      <DesignTools 
        category={selectedCategory || ''}
        onBack={onBackToCategories}
      />
      <DesignCanvas />
    </div>
  );
};

export default DesignApp;
