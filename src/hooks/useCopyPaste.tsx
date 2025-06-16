
import { useState } from 'react';
import { DesignElement } from '@/types/design';
import { useDesign } from '@/contexts/DesignContext';

export const useCopyPaste = () => {
  const { state, dispatch } = useDesign();
  const [clipboard, setClipboard] = useState<DesignElement[]>([]);

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const copyElements = () => {
    const selectedElements = state.elements.filter(el => state.selectedElements.includes(el.id));
    if (selectedElements.length > 0) {
      setClipboard(selectedElements);
      return selectedElements.length;
    }
    return 0;
  };

  const pasteElements = () => {
    if (clipboard.length === 0) return 0;

    const newElements = clipboard.map(element => ({
      ...element,
      id: generateId(),
      x: element.x + 20,
      y: element.y + 20,
    }));

    newElements.forEach(element => {
      dispatch({ type: 'ADD_ELEMENT', element });
    });

    // Select the pasted elements
    dispatch({ 
      type: 'SELECT_MULTIPLE', 
      ids: newElements.map(el => el.id) 
    });

    return newElements.length;
  };

  const duplicateElements = () => {
    const selectedElements = state.elements.filter(el => state.selectedElements.includes(el.id));
    if (selectedElements.length === 0) return 0;

    const newElements = selectedElements.map(element => ({
      ...element,
      id: generateId(),
      x: element.x + 20,
      y: element.y + 20,
    }));

    newElements.forEach(element => {
      dispatch({ type: 'ADD_ELEMENT', element });
    });

    // Select the duplicated elements
    dispatch({ 
      type: 'SELECT_MULTIPLE', 
      ids: newElements.map(el => el.id) 
    });

    return newElements.length;
  };

  return {
    clipboard: clipboard.length,
    copyElements,
    pasteElements,
    duplicateElements,
  };
};
