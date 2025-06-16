
import { useEffect, useState } from 'react';
import { useDesign } from '@/contexts/DesignContext';
import { DesignElement } from '@/types/design';

interface KeyboardShortcutsProps {
  onUndo?: () => void;
  onRedo?: () => void;
  onDelete?: () => void;
  onSelectAll?: () => void;
  onCopy?: () => void;
  onPaste?: () => void;
}

export const useKeyboardShortcuts = ({
  onUndo,
  onRedo,
  onDelete,
  onSelectAll,
  onCopy,
  onPaste
}: KeyboardShortcutsProps) => {
  const { state, dispatch } = useDesign();
  const [clipboard, setClipboard] = useState<DesignElement | null>(null);

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const copyElement = () => {
    if (state.selectedElement) {
      const element = state.elements.find(el => el.id === state.selectedElement);
      if (element) {
        setClipboard(element);
      }
    }
  };

  const pasteElement = () => {
    if (clipboard) {
      const newElement = {
        ...clipboard,
        id: generateId(),
        x: clipboard.x + 20,
        y: clipboard.y + 20,
      };
      dispatch({ type: 'ADD_ELEMENT', element: newElement });
      dispatch({ type: 'SELECT_ELEMENT', id: newElement.id });
    }
  };

  const duplicateElement = () => {
    if (state.selectedElement) {
      const element = state.elements.find(el => el.id === state.selectedElement);
      if (element) {
        const newElement = {
          ...element,
          id: generateId(),
          x: element.x + 20,
          y: element.y + 20,
        };
        dispatch({ type: 'ADD_ELEMENT', element: newElement });
        dispatch({ type: 'SELECT_ELEMENT', id: newElement.id });
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Prevent shortcuts when typing in input fields
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return;
      }

      const isCtrl = event.ctrlKey || event.metaKey;

      // Undo: Ctrl+Z
      if (isCtrl && event.key === 'z' && !event.shiftKey) {
        event.preventDefault();
        onUndo?.();
      }

      // Redo: Ctrl+Shift+Z or Ctrl+Y
      if (isCtrl && ((event.key === 'z' && event.shiftKey) || event.key === 'y')) {
        event.preventDefault();
        onRedo?.();
      }

      // Delete: Delete or Backspace
      if ((event.key === 'Delete' || event.key === 'Backspace') && state.selectedElement) {
        event.preventDefault();
        if (onDelete) {
          onDelete();
        } else {
          dispatch({ type: 'DELETE_ELEMENT', id: state.selectedElement });
        }
      }

      // Select All: Ctrl+A
      if (isCtrl && event.key === 'a') {
        event.preventDefault();
        onSelectAll?.();
      }

      // Copy: Ctrl+C
      if (isCtrl && event.key === 'c' && state.selectedElement) {
        event.preventDefault();
        if (onCopy) {
          onCopy();
        } else {
          copyElement();
        }
      }

      // Paste: Ctrl+V
      if (isCtrl && event.key === 'v') {
        event.preventDefault();
        if (onPaste) {
          onPaste();
        } else {
          pasteElement();
        }
      }

      // Duplicate: Ctrl+D
      if (isCtrl && event.key === 'd') {
        event.preventDefault();
        duplicateElement();
      }

      // Escape: Deselect
      if (event.key === 'Escape') {
        event.preventDefault();
        dispatch({ type: 'SELECT_ELEMENT', id: null });
      }

      // Arrow keys: Move selected element
      if (state.selectedElement && ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
        event.preventDefault();
        const element = state.elements.find(el => el.id === state.selectedElement);
        if (element) {
          const moveDistance = event.shiftKey ? 10 : 1;
          let newX = element.x;
          let newY = element.y;

          switch (event.key) {
            case 'ArrowUp':
              newY -= moveDistance;
              break;
            case 'ArrowDown':
              newY += moveDistance;
              break;
            case 'ArrowLeft':
              newX -= moveDistance;
              break;
            case 'ArrowRight':
              newX += moveDistance;
              break;
          }

          dispatch({
            type: 'UPDATE_ELEMENT',
            id: state.selectedElement,
            updates: { x: newX, y: newY }
          });
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [state.selectedElement, state.elements, clipboard, onUndo, onRedo, onDelete, onSelectAll, onCopy, onPaste, dispatch]);
};
