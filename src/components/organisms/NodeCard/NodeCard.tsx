import React from 'react';
import clsx from 'clsx';
import { NodeHeader } from '../../molecules/NodeHeader/NodeHeader';
import { NodeAnswers } from '../../molecules/NodeAnswers/NodeAnswers';
import { Typography } from '../../atoms/Typography/Typography';
import type { FlowNode } from '../../../types/flow';

interface NodeCardProps {
  node: FlowNode;
  isSelected?: boolean;
  className?: string;
  onSelect?: (id: string) => void;
  onPointerDown?: (event: React.PointerEvent<HTMLDivElement>, id: string) => void;
}

export const NodeCard: React.FC<NodeCardProps> = ({
  node,
  isSelected = false,
  className,
  onSelect,
  onPointerDown,
}) => {
  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    onSelect?.(node.id);
    onPointerDown?.(event, node.id);
  };

  return (
    <div
      data-node-id={node.id}
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      onPointerDown={handlePointerDown}
      onClick={() => onSelect?.(node.id)}
      style={{ left: node.position.x, top: node.position.y }}
      className={clsx(
        'absolute w-65 rounded-xl border bg-surface px-4 py-3',
        'shadow-lg shadow-black/30 transition-all duration-150',
        'cursor-grab active:cursor-grabbing',
        isSelected ? 'border-accent/60 ring-2 ring-accent/40' : 'border-accent/15',
        className,
      )}
    >
      <NodeHeader type={node.type} nodeId={node.id} />
      <Typography variant="body" size="sm" className="text-light/80">
        {node.text}
      </Typography>
      <NodeAnswers options={node.options} nodeType={node.type} />
    </div>
  );
};
