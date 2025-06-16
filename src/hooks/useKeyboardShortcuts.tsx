
import { useEffect } from 'react';
import { useDesign } from '@/contexts/DesignContext';
import { useCopyPaste } from './useCopyPaste';

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
  const { copyElements, pasteElements, duplicateElements } = useCopyPaste();

  const selectAllElements = () => {
    const allIds = state.elements.map(el => el.id);
    dispatch({ type: 'SELECT_MULTIPLE', ids: allIds });
  };

  const deleteSelected = () => {
    state.selectedElements.forEach(id => {
      dispatch({ type: 'DELETE_ELEMENT', id });
    });
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
      if ((event.key === 'Delete' || event.key === 'Backspace') && state.selectedElements.length > 0) {
        event.preventDefault();
        if (onDelete) {
          onDelete();
        } else {
          deleteSelected();
        }
      }

      // Select All: Ctrl+A
      if (isCtrl && event.key === 'a') {
        event.preventDefault();
        if (onSelectAll) {
          onSelectAll();
        } else {
          selectAllElements();
        }
      }

      // Copy: Ctrl+C
      if (isCtrl && event.key === 'c' && state.selectedElements.length > 0) {
        event.preventDefault();
        if (onCopy) {
          onCopy();
        } else {
          copyElements();
        }
      }

      // Paste: Ctrl+V
      if (isCtrl && event.key === 'v') {
        event.preventDefault();
        if (onPaste) {
          onPaste();
        } else {
          pasteElements();
        }
      }

      // Duplicate: Ctrl+D
      if (isCtrl && event.key === 'd') {
        event.preventDefault();
        duplicateElements();
      }

      // Escape: Deselect
      if (event.key === 'Escape') {
        event.preventDefault();
        dispatch({ type: 'CLEAR_SELECTION' });
      }

      // Arrow keys: Move selected elements
      if (state.selectedElements.length > 0 && ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
        event.preventDefault();
        const moveDistance = event.shiftKey ? 10 : 1;
        
        state.selectedElements.forEach(id => {
          const element = state.elements.find(el => el.id === id);
          if (element) {
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
              id: id,
              updates: { x: newX, y: newY }
            });
          }
        });
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [state.selectedElements, state.elements, onUndo, onRedo, onDelete, onSelectAll, onCopy, onPaste, dispatch, copyElements, pasteElements, duplicateElements]);
};
