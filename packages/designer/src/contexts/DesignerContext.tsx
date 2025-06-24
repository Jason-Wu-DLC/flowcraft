// packages/designer/src/contexts/DesignerContext.tsx
import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';

export interface CanvasComponent {
  id: string;
  type: string;
  x: number;
  y: number;
  width: number;
  height: number;
  properties: Record<string, any>;
  children?: string[];
}

interface DesignerState {
  components: CanvasComponent[];
  selectedComponents: string[];
  activeTool: string;
  zoom: number;
  canUndo: boolean;
  canRedo: boolean;
  history: CanvasComponent[][];
  historyIndex: number;
}

type DesignerAction =
  | { type: 'ADD_COMPONENT'; payload: { componentType: string; position: { x: number; y: number } } }
  | { type: 'SELECT_COMPONENT'; payload: string }
  | { type: 'UPDATE_COMPONENT'; payload: { id: string; updates: Partial<CanvasComponent> } }
  | { type: 'DELETE_COMPONENT'; payload: string }
  | { type: 'SET_ACTIVE_TOOL'; payload: string }
  | { type: 'SET_ZOOM'; payload: number }
  | { type: 'UNDO' }
  | { type: 'REDO' }
  | { type: 'CLEAR_SELECTION' };

const initialState: DesignerState = {
  components: [],
  selectedComponents: [],
  activeTool: 'select',
  zoom: 1,
  canUndo: false,
  canRedo: false,
  history: [[]],
  historyIndex: 0,
};

// 默认组件配置
const getDefaultComponent = (type: string, position: { x: number; y: number }): CanvasComponent => {
  const baseComponent = {
    id: uuidv4(),
    type,
    x: position.x,
    y: position.y,
    properties: {},
    children: [],
  };

  switch (type) {
    case 'button':
      return {
        ...baseComponent,
        width: 120,
        height: 40,
        properties: {
          text: '按钮',
          variant: 'primary',
          size: 'md',
        },
      };
    case 'input':
      return {
        ...baseComponent,
        width: 200,
        height: 40,
        properties: {
          placeholder: '请输入...',
          label: '输入框',
        },
      };
    case 'text':
      return {
        ...baseComponent,
        width: 100,
        height: 30,
        properties: {
          content: '文本内容',
          fontSize: 16,
          color: '#333333',
        },
      };
    case 'container':
      return {
        ...baseComponent,
        width: 300,
        height: 200,
        properties: {
          backgroundColor: '#f8f9fa',
          padding: 16,
          borderRadius: 8,
        },
      };
    default:
      return {
        ...baseComponent,
        width: 100,
        height: 100,
        properties: {},
      };
  }
};

const designerReducer = (state: DesignerState, action: DesignerAction): DesignerState => {
  switch (action.type) {
    case 'ADD_COMPONENT': {
      const newComponent = getDefaultComponent(action.payload.componentType, action.payload.position);
      const newComponents = [...state.components, newComponent];
      const newHistory = state.history.slice(0, state.historyIndex + 1);
      newHistory.push(newComponents);

      return {
        ...state,
        components: newComponents,
        selectedComponents: [newComponent.id],
        history: newHistory,
        historyIndex: newHistory.length - 1,
        canUndo: true,
        canRedo: false,
      };
    }

    case 'SELECT_COMPONENT':
      return {
        ...state,
        selectedComponents: [action.payload],
      };

    case 'UPDATE_COMPONENT': {
      const newComponents = state.components.map(component =>
        component.id === action.payload.id
          ? { ...component, ...action.payload.updates }
          : component
      );

      return {
        ...state,
        components: newComponents,
      };
    }

    case 'DELETE_COMPONENT': {
      const newComponents = state.components.filter(c => c.id !== action.payload);
      const newHistory = state.history.slice(0, state.historyIndex + 1);
      newHistory.push(newComponents);

      return {
        ...state,
        components: newComponents,
        selectedComponents: state.selectedComponents.filter(id => id !== action.payload),
        history: newHistory,
        historyIndex: newHistory.length - 1,
        canUndo: true,
        canRedo: false,
      };
    }

    case 'SET_ACTIVE_TOOL':
      return {
        ...state,
        activeTool: action.payload,
      };

    case 'SET_ZOOM':
      return {
        ...state,
        zoom: Math.max(0.1, Math.min(3, action.payload)),
      };

    case 'UNDO': {
      if (!state.canUndo) return state;

      const newIndex = state.historyIndex - 1;
      return {
        ...state,
        components: state.history[newIndex],
        historyIndex: newIndex,
        canUndo: newIndex > 0,
        canRedo: true,
      };
    }

    case 'REDO': {
      if (!state.canRedo) return state;

      const newIndex = state.historyIndex + 1;
      return {
        ...state,
        components: state.history[newIndex],
        historyIndex: newIndex,
        canUndo: true,
        canRedo: newIndex < state.history.length - 1,
      };
    }

    case 'CLEAR_SELECTION':
      return {
        ...state,
        selectedComponents: [],
      };

    default:
      return state;
  }
};

interface DesignerContextValue {
  state: DesignerState;
  actions: {
    addComponent: (componentType: string, position: { x: number; y: number }) => void;
    selectComponent: (componentId: string) => void;
    updateComponent: (componentId: string, updates: Partial<CanvasComponent>) => void;
    deleteComponent: (componentId: string) => void;
    setActiveTool: (tool: string) => void;
    zoomIn: () => void;
    zoomOut: () => void;
    undo: () => void;
    redo: () => void;
    clearSelection: () => void;
  };
}

const DesignerContext = createContext<DesignerContextValue | undefined>(undefined);

export const DesignerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(designerReducer, initialState);

  const actions = {
    addComponent: (componentType: string, position: { x: number; y: number }) =>
      dispatch({ type: 'ADD_COMPONENT', payload: { componentType, position } }),

    selectComponent: (componentId: string) =>
      dispatch({ type: 'SELECT_COMPONENT', payload: componentId }),

    updateComponent: (componentId: string, updates: Partial<CanvasComponent>) =>
      dispatch({ type: 'UPDATE_COMPONENT', payload: { id: componentId, updates } }),

    deleteComponent: (componentId: string) =>
      dispatch({ type: 'DELETE_COMPONENT', payload: componentId }),

    setActiveTool: (tool: string) =>
      dispatch({ type: 'SET_ACTIVE_TOOL', payload: tool }),

    zoomIn: () =>
      dispatch({ type: 'SET_ZOOM', payload: state.zoom + 0.1 }),

    zoomOut: () =>
      dispatch({ type: 'SET_ZOOM', payload: state.zoom - 0.1 }),

    undo: () => dispatch({ type: 'UNDO' }),
    redo: () => dispatch({ type: 'REDO' }),
    clearSelection: () => dispatch({ type: 'CLEAR_SELECTION' }),
  };

  return (
    <DesignerContext.Provider value={{ state, actions }}>
      {children}
    </DesignerContext.Provider>
  );
};

export const useDesigner = (): DesignerContextValue => {
  const context = useContext(DesignerContext);
  if (context === undefined) {
    throw new Error('useDesigner must be used within a DesignerProvider');
  }
  return context;
};