
import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { DesignElement, DesignState } from '@/types/design';

type DesignAction =
  | { type: 'ADD_ELEMENT'; element: DesignElement }
  | { type: 'UPDATE_ELEMENT'; id: string; updates: Partial<DesignElement> }
  | { type: 'DELETE_ELEMENT'; id: string }
  | { type: 'SELECT_ELEMENT'; id: string | null }
  | { type: 'CLEAR_CANVAS' }
  | { type: 'SET_CANVAS_SIZE'; width: number; height: number };

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
    default:
      return state;
  }
}

interface DesignContextType {
  state: DesignState;
  dispatch: React.Dispatch<DesignAction>;
}

const DesignContext = createContext<DesignContextType | undefined>(undefined);

export const DesignProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(designReducer, initialState);

  return (
    <DesignContext.Provider value={{ state, dispatch }}>
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
