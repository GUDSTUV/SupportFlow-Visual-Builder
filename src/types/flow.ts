export type NodeType = 'start' | 'question' | 'end';
export interface Option {
  label: string;
  nextId: string;
}
export interface FlowNode {
  id: string;
  type: NodeType;
  text: string;
  position: { x: number; y: number };
  options: Option[];
}
export interface FlowMeta {
  theme: 'dark' | 'light';
  canvas_size: { w: number; h: number };
}
export interface FlowData {
  meta: FlowMeta;
  nodes: FlowNode[];
}
export type AppMode = 'editor' | 'preview';
export interface EdgePath {
  id: string;
  path: string;
  label: string;
  color: string;
}