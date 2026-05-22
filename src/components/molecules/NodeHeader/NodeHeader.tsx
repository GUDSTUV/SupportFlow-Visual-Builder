import React from 'react';
import { Badge } from '../../atoms/Badge/Badge';
import { Flag, HelpCircle, Square } from 'lucide-react';
import type { NodeType } from '../../../types/flow';

interface NodeHeaderProps {
  type: NodeType;
  nodeId: string;
}
const typeIcons: Record<NodeType, React.ReactNode> = {
  start: <Flag className="h-4 w-4" />,
  question: <HelpCircle className="h-4 w-4" />,
  end: <Square className="h-4 w-4" />,
};

const iconClasses: Record<NodeType, string> = {
  start: 'bg-accent/15 text-accent',
  question: 'bg-surface text-text-primary',
  end: 'bg-red-500/15 text-red-300',
};

export const NodeHeader: React.FC<NodeHeaderProps> = ({ type, nodeId }) => {
  return (
    <div className="flex items-center justify-between mb-2.5">
      <div className="flex items-center gap-2">
        <span
          className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200 ${iconClasses[type]}`}
        >
          {typeIcons[type]}
        </span>
        <Badge type={type} />
      </div>
      <span className="text-[10px] text-accent/50 font-medium tracking-wide">#{nodeId}</span>
    </div>
  );
};
