export interface FlowNode {
  id: string;
  type: string; // 组件类型
  x: number;
  y: number;
  props: Record<string, any>;
  zIndex?: number;
  groupId?: string; // 所属分组id，可选
}

export interface Edge {
  id: string;
  from: string; // 起点节点id
  to: string;   // 终点节点id
  label?: string; // 连线标签
  expression?: string; // 条件表达式
  type?: string; // 数据流类型等
}

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

export interface CanvasState {
  nodes: FlowNode[];
  edges: Edge[];
  groups: Group[];
  selectedNodeId?: string;
  selectedEdgeId?: string;
  selectedGroupId?: string;
  selectedNodeIds?: string[]; // 多选支持
} 