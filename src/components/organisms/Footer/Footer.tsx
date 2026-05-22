import React from 'react';
import { useFlowStore } from '../../../store/flowStore';
import { useShallow } from 'zustand/react/shallow';

export const Footer: React.FC = () => {
  const { nodesCount, selectedNodeId, canvasScale, setCanvasOffset, setCanvasScale } = useFlowStore(
    useShallow(state => ({
      nodesCount: state.nodes.length,
      selectedNodeId: state.selectedNodeId,
      canvasScale: state.canvasScale,
      setCanvasOffset: state.setCanvasOffset,
      setCanvasScale: state.setCanvasScale,
    })),
  );

  return (
    <footer className="flex flex-col gap-2 px-4 py-2 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-0 sm:h-12 bg-surface border-t border-accent/20 text-[11px] sm:text-xs text-light/70">
      <div className="flex flex-wrap items-center gap-4">
        <span className="text-text-primary">Nodes: {nodesCount}</span>
        <span className="text-light/60">
          Selected: {selectedNodeId ? `#${selectedNodeId}` : 'None'}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-light/60">Zoom</span>
        <span className="text-text-primary">{Math.round(canvasScale * 100)}%</span>
        <button
          onClick={() => {
            setCanvasScale(1);
            setCanvasOffset(0, 0);
          }}
          className="ml-2 rounded-md border border-accent/20 bg-canvas/60 px-2 py-1 text-[10px] text-light/70 hover:text-text-primary hover:border-accent/40 transition-colors"
        >
          Reset
        </button>
      </div>
    </footer>
  );
};
