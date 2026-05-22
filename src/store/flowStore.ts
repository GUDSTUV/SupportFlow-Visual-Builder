import { create } from 'zustand';
import type { FlowNode, Option, AppMode, NodeType } from '../types/flow';
import flowData from '../data/flow_data.json';
interface FlowStore {
  nodes: FlowNode[];
  selectedNodeId: string | null;
  mode: AppMode;
  history: FlowNode[][];
  future: FlowNode[][];
  canvasOffset: { x: number; y: number };
  canvasScale: number;
  // Selection
  selectNode: (id: string | null) => void;
  // Mode
  setMode: (mode: AppMode) => void;
  // Node editing
  updateNodeText: (id: string, text: string) => void;
  updateOptionLabel: (nodeId: string, optionIndex: number, label: string) => void;
  updateOptionTarget: (nodeId: string, optionIndex: number, nextId: string) => void;
  addOption: (nodeId: string) => void;
  removeOption: (nodeId: string, optionIndex: number) => void;
  addNode: (type: NodeType) => void;
  moveNode: (id: string, x: number, y: number) => void;
  // History
  undo: () => void;
  redo: () => void;
  // Canvas
  setCanvasOffset: (x: number, y: number) => void;
  setCanvasScale: (scale: number) => void;
}
const MAX_HISTORY = 50;
const initialNodes = flowData.nodes as FlowNode[];
function snapshot(nodes: FlowNode[]): FlowNode[] {
  return JSON.parse(JSON.stringify(nodes));
}
export const useFlowStore = create<FlowStore>((set, get) => ({
  nodes: snapshot(initialNodes),
  selectedNodeId: null,
  mode: 'editor',
  history: [],
  future: [],
  canvasOffset: { x: 0, y: 0 },
  canvasScale: 1,
  selectNode: (id) => set({ selectedNodeId: id }),
  setMode: (mode) => set({ mode, selectedNodeId: null }),
  updateNodeText: (id, text) => {
    const { nodes, history } = get();
    set({
      history: [...history.slice(-MAX_HISTORY), snapshot(nodes)],
      future: [],
      nodes: nodes.map((n) => (n.id === id ? { ...n, text } : n)),
    });
  },
  updateOptionLabel: (nodeId, optionIndex, label) => {
    const { nodes, history } = get();
    set({
      history: [...history.slice(-MAX_HISTORY), snapshot(nodes)],
      future: [],
      nodes: nodes.map((n) => {
        if (n.id !== nodeId) return n;
        const options = n.options.map((o, i) =>
          i === optionIndex ? { ...o, label } : o
        );
        return { ...n, options };
      }),
    });
  },
  updateOptionTarget: (nodeId, optionIndex, nextId) => {
    const { nodes, history } = get();
    set({
      history: [...history.slice(-MAX_HISTORY), snapshot(nodes)],
      future: [],
      nodes: nodes.map((n) => {
        if (n.id !== nodeId) return n;
        const options = n.options.map((o, i) =>
          i === optionIndex ? { ...o, nextId } : o
        );
        return { ...n, options };
      }),
    });
  },
  addOption: (nodeId) => {
    const { nodes, history } = get();
    const allIds = nodes.map((n) => n.id);
    const defaultNextId = allIds.find((id) => id !== nodeId) || '';
    set({
      history: [...history.slice(-MAX_HISTORY), snapshot(nodes)],
      future: [],
      nodes: nodes.map((n) => {
        if (n.id !== nodeId) return n;
        const newOption: Option = { label: 'New Option', nextId: defaultNextId };
        return { ...n, options: [...n.options, newOption] };
      }),
    });
  },
  removeOption: (nodeId, optionIndex) => {
    const { nodes, history } = get();
    set({
      history: [...history.slice(-MAX_HISTORY), snapshot(nodes)],
      future: [],
      nodes: nodes.map((n) => {
        if (n.id !== nodeId) return n;
        const options = n.options.filter((_, i) => i !== optionIndex);
        return { ...n, options };
      }),
    });
  },
  addNode: (type) => {
    const { nodes, history } = get();
    const nextId = String(
      nodes.reduce((max, node) => Math.max(max, Number(node.id) || 0), 0) + 1,
    );
    const defaultNextId = nodes[0]?.id || '';
    const index = nodes.length;
    const col = index % 4;
    const row = Math.floor(index / 4);
    const position = { x: 140 + col * 280, y: 120 + row * 220 };
    const text =
      type === 'start'
        ? 'New start node'
        : type === 'question'
          ? 'New question'
          : 'New end node';
    const options = type === 'end' ? [] : [{ label: 'New option', nextId: defaultNextId }];

    const newNode: FlowNode = { id: nextId, type, text, position, options };

    set({
      history: [...history.slice(-MAX_HISTORY), snapshot(nodes)],
      future: [],
      nodes: [...nodes, newNode],
      selectedNodeId: nextId,
    });
  },
  moveNode: (id, x, y) => {
    set((state) => ({
      nodes: state.nodes.map((n) =>
        n.id === id ? { ...n, position: { x, y } } : n
      ),
    }));
  },
  undo: () => {
    const { history, nodes, future } = get();
    if (history.length === 0) return;
    const prev = history[history.length - 1];
    set({
      nodes: prev,
      history: history.slice(0, -1),
      future: [snapshot(nodes), ...future.slice(0, MAX_HISTORY)],
    });
  },
  redo: () => {
    const { future, nodes, history } = get();
    if (future.length === 0) return;
    const next = future[0];
    set({
      nodes: next,
      future: future.slice(1),
      history: [...history.slice(-MAX_HISTORY), snapshot(nodes)],
    });
  },
  setCanvasOffset: (x, y) => set({ canvasOffset: { x, y } }),
  setCanvasScale: (scale) => set({ canvasScale: scale }),
}));
