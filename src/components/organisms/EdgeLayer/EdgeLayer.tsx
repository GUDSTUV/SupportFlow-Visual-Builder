import React, { useLayoutEffect, useMemo, useState } from 'react';
import type { FlowNode } from '../../../types/flow';

interface EdgeRender {
  id: string;
  path: string;
  label: string;
  labelX: number;
  labelY: number;
}

interface EdgeLayerProps {
  nodes: FlowNode[];
  containerRef: React.RefObject<HTMLDivElement | null>;
}

interface NodeSize {
  width: number;
  height: number;
}

const FALLBACK_NODE_WIDTH = 260;
const FALLBACK_NODE_HEIGHT = 140;

function buildEdgePath(
  from: { x: number; y: number },
  to: { x: number; y: number }
): { path: string; labelX: number; labelY: number } {
  const fromX = from.x;
  const fromY = from.y;
  const toX = to.x;
  const toY = to.y;

  const dx = toX - fromX;
  const cy1 = fromY;
  const cx2 = toX - dx * 0.3;
  const cy2 = toY;
  const cx1 = fromX + dx * 0.3;

  const path = `M ${fromX} ${fromY} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${toX} ${toY}`;
  const labelX = (fromX + toX) / 2;
  const labelY = (fromY + toY) / 2 - 8;

  return { path, labelX, labelY };
}

export const EdgeLayer: React.FC<EdgeLayerProps> = ({ nodes, containerRef }) => {
  const [nodeSizes, setNodeSizes] = useState<Record<string, NodeSize>>({});

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const nextSizes: Record<string, NodeSize> = {};
    const elements = container.querySelectorAll<HTMLElement>('[data-node-id]');

    elements.forEach((el) => {
      const id = el.dataset.nodeId;
      if (!id) return;
      nextSizes[id] = { width: el.offsetWidth, height: el.offsetHeight };
    });

    setNodeSizes(nextSizes);
  }, [nodes, containerRef]);

  const edges = useMemo(() => {
    const nextEdges: EdgeRender[] = [];

    nodes.forEach((node) => {
      const fromSize = nodeSizes[node.id] ?? {
        width: FALLBACK_NODE_WIDTH,
        height: FALLBACK_NODE_HEIGHT,
      };
      const fromPoint = {
        x: node.position.x + fromSize.width / 2,
        y: node.position.y + fromSize.height / 2,
      };

      node.options.forEach((option, index) => {
        if (!option.nextId) return;
        const target = nodes.find((targetNode) => targetNode.id === option.nextId);
        if (!target) return;

        const toSize = nodeSizes[target.id] ?? {
          width: FALLBACK_NODE_WIDTH,
          height: FALLBACK_NODE_HEIGHT,
        };
        const toPoint = {
          x: target.position.x + toSize.width / 2,
          y: target.position.y + toSize.height / 2,
        };

        const { path, labelX, labelY } = buildEdgePath(fromPoint, toPoint);

        nextEdges.push({
          id: `${node.id}-${option.nextId}-${index}`,
          label: option.label,
          path,
          labelX,
          labelY,
        });
      });
    });

    return nextEdges;
  }, [nodes, nodeSizes]);

  return (
    <svg className="absolute inset-0 h-full w-full pointer-events-none">
      {edges.map((edge) => (
        <g key={edge.id}>
          <path d={edge.path} className="stroke-accent/50" fill="none" strokeWidth={1.5} />
        </g>
      ))}
    </svg>
  );
};
