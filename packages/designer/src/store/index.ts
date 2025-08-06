import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

// 节点接口
export interface FlowNode {
  id: string;
  type: string;
  x: number;
  y: number;
  props: Record<string, any>;
  zIndex?: number;
  groupId?: string;
}

// 连线接口
export interface Edge {
  id: string;
  from: string;
  to: string;
  label?: string;
  expression?: string;
  type?: string;
}

// 分组接口
export interface Group {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  nodeIds: string[];
  collapsed: boolean;
  zIndex: number;
}

// 画布状态接口
interface CanvasState {
  nodes: FlowNode[];
  edges: Edge[];
  groups: Group[];
  selectedNodeId: string | null;
  selectedNodeIds: string[];
  selectedEdgeId: string | null;
  selectedGroupId: string | null;
  isPreviewMode: boolean;
  history: any[];
  historyIndex: number;
}

// 初始状态
const initialState: CanvasState = {
  nodes: [],
  edges: [],
  groups: [],
  selectedNodeId: null,
  selectedNodeIds: [],
  selectedEdgeId: null,
  selectedGroupId: null,
  isPreviewMode: false,
  history: [],
  historyIndex: -1,
};

// 创建canvas slice
const canvasSlice = createSlice({
  name: 'canvas',
  initialState,
  reducers: {
    // 节点操作
    addNode: (state, action: PayloadAction<FlowNode>) => {
      state.nodes.push(action.payload);
      state.history.push(JSON.parse(JSON.stringify(state)));
      state.historyIndex = state.history.length - 1;
    },
    updateNode: (state, action: PayloadAction<{ id: string; updates: Partial<FlowNode> }>) => {
      const { id, updates } = action.payload;
      const nodeIndex = state.nodes.findIndex(n => n.id === id);
      if (nodeIndex !== -1) {
        state.nodes[nodeIndex] = { ...state.nodes[nodeIndex], ...updates };
        state.history.push(JSON.parse(JSON.stringify(state)));
        state.historyIndex = state.history.length - 1;
      }
    },
    removeNode: (state, action: PayloadAction<string>) => {
      state.nodes = state.nodes.filter(n => n.id !== action.payload);
      state.edges = state.edges.filter(e => e.from !== action.payload && e.to !== action.payload);
      state.history.push(JSON.parse(JSON.stringify(state)));
      state.historyIndex = state.history.length - 1;
    },
    selectNode: (state, action: PayloadAction<string | null>) => {
      state.selectedNodeId = action.payload;
      state.selectedEdgeId = null;
      state.selectedGroupId = null;
    },
    setSelectedNodeIds: (state, action: PayloadAction<string[]>) => {
      state.selectedNodeIds = action.payload;
    },

    // 连线操作
    addEdge: (state, action: PayloadAction<Edge>) => {
      state.edges.push(action.payload);
      state.history.push(JSON.parse(JSON.stringify(state)));
      state.historyIndex = state.history.length - 1;
    },
    updateEdge: (state, action: PayloadAction<{ id: string; updates: Partial<Edge> }>) => {
      const { id, updates } = action.payload;
      const edgeIndex = state.edges.findIndex(e => e.id === id);
      if (edgeIndex !== -1) {
        state.edges[edgeIndex] = { ...state.edges[edgeIndex], ...updates };
        state.history.push(JSON.parse(JSON.stringify(state)));
        state.historyIndex = state.history.length - 1;
      }
    },
    removeEdge: (state, action: PayloadAction<string>) => {
      state.edges = state.edges.filter(e => e.id !== action.payload);
      state.history.push(JSON.parse(JSON.stringify(state)));
      state.historyIndex = state.history.length - 1;
    },
    selectEdge: (state, action: PayloadAction<string | null>) => {
      state.selectedEdgeId = action.payload;
      state.selectedNodeId = null;
      state.selectedGroupId = null;
    },

    // 分组操作
    addGroup: (state, action: PayloadAction<Group>) => {
      state.groups.push(action.payload);
      state.history.push(JSON.parse(JSON.stringify(state)));
      state.historyIndex = state.history.length - 1;
    },
    updateGroup: (state, action: PayloadAction<{ id: string; updates: Partial<Group> }>) => {
      const { id, updates } = action.payload;
      const groupIndex = state.groups.findIndex(g => g.id === id);
      if (groupIndex !== -1) {
        state.groups[groupIndex] = { ...state.groups[groupIndex], ...updates };
        state.history.push(JSON.parse(JSON.stringify(state)));
        state.historyIndex = state.history.length - 1;
      }
    },
    removeGroup: (state, action: PayloadAction<string>) => {
      const group = state.groups.find(g => g.id === action.payload);
      if (group) {
        // 移除分组中的节点关联
        state.nodes = state.nodes.map(node => 
          node.groupId === action.payload ? { ...node, groupId: undefined } : node
        );
        state.groups = state.groups.filter(g => g.id !== action.payload);
        state.history.push(JSON.parse(JSON.stringify(state)));
        state.historyIndex = state.history.length - 1;
      }
    },
    selectGroup: (state, action: PayloadAction<string | null>) => {
      state.selectedGroupId = action.payload;
      state.selectedNodeId = null;
      state.selectedEdgeId = null;
    },
    addNodesToGroup: (state, action: PayloadAction<{ groupId: string; nodeIds: string[] }>) => {
      const { groupId, nodeIds } = action.payload;
      const group = state.groups.find(g => g.id === groupId);
      if (group) {
        group.nodeIds = [...group.nodeIds, ...nodeIds];
        // 更新节点的groupId
        state.nodes = state.nodes.map(node => 
          nodeIds.includes(node.id) ? { ...node, groupId } : node
        );
        state.history.push(JSON.parse(JSON.stringify(state)));
        state.historyIndex = state.history.length - 1;
      }
    },
    removeNodesFromGroup: (state, action: PayloadAction<{ groupId: string; nodeIds: string[] }>) => {
      const { groupId, nodeIds } = action.payload;
      const group = state.groups.find(g => g.id === groupId);
      if (group) {
        group.nodeIds = group.nodeIds.filter(id => !nodeIds.includes(id));
        // 移除节点的groupId
        state.nodes = state.nodes.map(node => 
          nodeIds.includes(node.id) ? { ...node, groupId: undefined } : node
        );
        state.history.push(JSON.parse(JSON.stringify(state)));
        state.historyIndex = state.history.length - 1;
      }
    },

    // 预览模式
    togglePreviewMode: (state) => {
      state.isPreviewMode = !state.isPreviewMode;
      state.history.push(JSON.parse(JSON.stringify(state)));
      state.historyIndex = state.history.length - 1;
    },

    // 撤销/重做
    undo: (state) => {
      if (state.historyIndex > 0) {
        state.historyIndex--;
        const previousState = state.history[state.historyIndex];
        Object.assign(state, previousState);
      }
    },
    redo: (state) => {
      if (state.historyIndex < state.history.length - 1) {
        state.historyIndex++;
        const nextState = state.history[state.historyIndex];
        Object.assign(state, nextState);
      }
    },

    // 导入/导出
    importFlow: (state, action: PayloadAction<{ nodes: FlowNode[]; edges: Edge[]; groups: Group[] }>) => {
      state.nodes = action.payload.nodes;
      state.edges = action.payload.edges;
      state.groups = action.payload.groups;
      state.selectedNodeId = null;
      state.selectedEdgeId = null;
      state.selectedGroupId = null;
      state.selectedNodeIds = [];
      state.history = [];
      state.historyIndex = -1;
    },
  },
});

export const {
  addNode,
  updateNode,
  removeNode,
  selectNode,
  setSelectedNodeIds,
  addEdge,
  updateEdge,
  removeEdge,
  selectEdge,
  addGroup,
  updateGroup,
  removeGroup,
  selectGroup,
  addNodesToGroup,
  removeNodesFromGroup,
  togglePreviewMode,
  undo,
  redo,
  importFlow,
} = canvasSlice.actions;

// 创建store
export const store = configureStore({
  reducer: {
    canvas: canvasSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 