
import { useEffect } from 'react';
import { useDesign } from '@/contexts/DesignContext';

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
        onDelete?.() || dispatch({ type: 'DELETE_ELEMENT', id: state.selectedElement });
      }

      // Select All: Ctrl+A
      if (isCtrl && event.key === 'a') {
        event.preventDefault();
        onSelectAll?.();
      }

      // Copy: Ctrl+C
      if (isCtrl && event.key === 'c' && state.selectedElement) {
        event.preventDefault();
        onCopy?.();
      }

      // Paste: Ctrl+V
      if (isCtrl && event.key === 'v') {
        event.preventDefault();
        onPaste?.();
      }

      // Escape: Deselect
      if (event.key === 'Escape') {
        event.preventDefault();
        dispatch({ type: 'SELECT_ELEMENT', id: null });
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [state.selectedElement, onUndo, onRedo, onDelete, onSelectAll, onCopy, onPaste, dispatch]);
};
