
import { useCallback, useRef, useState } from 'react';
import { DesignState } from '@/types/design';

interface UndoRedoState {
  canUndo: boolean;
  canRedo: boolean;
  undo: () => void;
  redo: () => void;
  pushState: (state: DesignState) => void;
  clear: () => void;
}

export const useUndoRedo = (
  currentState: DesignState,
  onStateChange: (state: DesignState) => void
): UndoRedoState => {
  const [historyIndex, setHistoryIndex] = useState(0);
  const history = useRef<DesignState[]>([currentState]);

  const pushState = useCallback((state: DesignState) => {
    // Remove any future history if we're not at the end
    if (historyIndex < history.current.length - 1) {
      history.current = history.current.slice(0, historyIndex + 1);
    }
    
    // Add new state
    history.current.push({ ...state });
    setHistoryIndex(history.current.length - 1);
    
    // Limit history size to prevent memory issues
    if (history.current.length > 50) {
      history.current = history.current.slice(1);
      setHistoryIndex(history.current.length - 1);
    }
  }, [historyIndex]);

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      onStateChange(history.current[newIndex]);
    }
  }, [historyIndex, onStateChange]);

  const redo = useCallback(() => {
    if (historyIndex < history.current.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      onStateChange(history.current[newIndex]);
    }
  }, [historyIndex, onStateChange]);

  const clear = useCallback(() => {
    history.current = [currentState];
    setHistoryIndex(0);
  }, [currentState]);

  return {
    canUndo: historyIndex > 0,
    canRedo: historyIndex < history.current.length - 1,
    undo,
    redo,
    pushState,
    clear
  };
};
