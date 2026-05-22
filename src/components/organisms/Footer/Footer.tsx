import React from 'react';
import { useFlowStore } from '../../../store/flowStore';

export const Footer: React.FC = () => {
  const { nodesCount, selectedNodeId, canvasScale } = useFlowStore(state => ({
    nodesCount: state.nodes.length,
    selectedNodeId: state.selectedNodeId,
    canvasScale: state.canvasScale,
  }));

  return (
    <footer className="flex items-center justify-between px-6 h-12 bg-surface border-t border-accent/20 text-xs text-accent">
      <div className="flex items-center gap-4">
        <span className="text-accent/80">Nodes: {nodesCount}</span>
        <span className="text-accent/60">
          Selected: {selectedNodeId ? `#${selectedNodeId}` : 'None'}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-accent/60">Zoom</span>
        <span className="text-light">{Math.round(canvasScale * 100)}%</span>
      </div>
    </footer>
  );
};
