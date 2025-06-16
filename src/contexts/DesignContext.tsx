
import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { DesignElement, DesignState } from '@/types/design';
import { useUndoRedo } from '@/hooks/useUndoRedo';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';

type DesignAction =
  | { type: 'ADD_ELEMENT'; element: DesignElement }
  | { type: 'UPDATE_ELEMENT'; id: string; updates: Partial<DesignElement> }
  | { type: 'DELETE_ELEMENT'; id: string }
  | { type: 'SELECT_ELEMENT'; id: string | null }
  | { type: 'CLEAR_CANVAS' }
  | { type: 'SET_CANVAS_SIZE'; width: number; height: number }
  | { type: 'RESTORE_STATE'; state: DesignState };

const initialState: DesignState = {
  elements: [],
  selectedElement: null,
  canvasWidth: 800,
  canvasHeight: 600,
};

function designReducer(state: DesignState, action: DesignAction): DesignState {
  switch (action.type) {
    case 'ADD_ELEMENT':
      return {
        ...state,
        elements: [...state.elements, action.element],
      };
    case 'UPDATE_ELEMENT':
      return {
        ...state,
        elements: state.elements.map(element =>
          element.id === action.id ? { ...element, ...action.updates } : element
        ),
      };
    case 'DELETE_ELEMENT':
      return {
        ...state,
        elements: state.elements.filter(element => element.id !== action.id),
        selectedElement: state.selectedElement === action.id ? null : state.selectedElement,
      };
    case 'SELECT_ELEMENT':
      return {
        ...state,
        selectedElement: action.id,
      };
    case 'CLEAR_CANVAS':
      return {
        ...state,
        elements: [],
        selectedElement: null,
      };
    case 'SET_CANVAS_SIZE':
      return {
        ...state,
        canvasWidth: action.width,
        canvasHeight: action.height,
      };
    case 'RESTORE_STATE':
      return action.state;
    default:
      return state;
  }
}

interface DesignContextType {
  state: DesignState;
  dispatch: React.Dispatch<DesignAction>;
  canUndo: boolean;
  canRedo: boolean;
  undo: () => void;
  redo: () => void;
}

const DesignContext = createContext<DesignContextType | undefined>(undefined);

export const DesignProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(designReducer, initialState);
  
  const handleStateChange = (newState: DesignState) => {
    dispatch({ type: 'RESTORE_STATE', state: newState });
  };

  const { canUndo, canRedo, undo, redo, pushState } = useUndoRedo(state, handleStateChange);

  // Track state changes for undo/redo
  useEffect(() => {
    pushState(state);
  }, [state.elements, state.canvasWidth, state.canvasHeight]);

  // Setup keyboard shortcuts
  useKeyboardShortcuts({
    onUndo: undo,
    onRedo: redo,
  });

  return (
    <DesignContext.Provider value={{ state, dispatch, canUndo, canRedo, undo, redo }}>
      {children}
    </DesignContext.Provider>
  );
};

export const useDesign = () => {
  const context = useContext(DesignContext);
  if (context === undefined) {
    throw new Error('useDesign must be used within a DesignProvider');
  }
  return context;
};

// Re-export the types for convenience
export type { DesignElement, DesignState };
