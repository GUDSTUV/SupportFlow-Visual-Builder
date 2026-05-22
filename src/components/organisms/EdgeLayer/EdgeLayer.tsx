import React, { useLayoutEffect, useState } from 'react';
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

function buildEdgePath(
  fromRect: DOMRect,
  toRect: DOMRect,
  containerRect: DOMRect
): { path: string; labelX: number; labelY: number } {
  const fromX = fromRect.x - containerRect.x + fromRect.width / 2;
  const fromY = fromRect.y - containerRect.y + fromRect.height / 2;
  const toX = toRect.x - containerRect.x + toRect.width / 2;
  const toY = toRect.y - containerRect.y + toRect.height / 2;

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
  const [edges, setEdges] = useState<EdgeRender[]>([]);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateEdges = () => {
      const containerRect = container.getBoundingClientRect();
      const nextEdges: EdgeRender[] = [];

      nodes.forEach((node) => {
        const fromEl = container.querySelector(`[data-node-id="${node.id}"]`) as HTMLElement | null;

        if (!fromEl) return;

        node.options.forEach((option, index) => {
          if (!option.nextId) return;

          const toEl = container.querySelector(`[data-node-id="${option.nextId}"]`) as HTMLElement | null;

          if (!toEl) return;

          const { path, labelX, labelY } = buildEdgePath(
            fromEl.getBoundingClientRect(),
            toEl.getBoundingClientRect(),
            containerRect
          );

          nextEdges.push({
            id: `${node.id}-${option.nextId}-${index}`,
            label: option.label,
            path,
            labelX,
            labelY,
          });
        });
      });

      setEdges(nextEdges);
    };

    const frame = requestAnimationFrame(updateEdges);
    window.addEventListener('resize', updateEdges);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', updateEdges);
    };
  }, [nodes, containerRef]);

  return (
    <svg className="absolute inset-0 h-full w-full pointer-events-none">
      {edges.map((edge) => (
        <g key={edge.id}>
          <path d={edge.path} className="stroke-accent/50" fill="none" strokeWidth={1.5} />
          <text
            x={edge.labelX}
            y={edge.labelY}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-light/70 text-[10px]"
          >
            {edge.label}
          </text>
        </g>
      ))}
    </svg>
  );
};
