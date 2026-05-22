import React from 'react';
import clsx from 'clsx';
import type { NodeType } from '../../../types/flow';

interface BadgeProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'type'> {
  type: NodeType;
  showDot?: boolean;
}

const badgeConfig: Record<NodeType, { label: string; classes: string; dot: string }> = {
  start: {
    label: 'START',
    classes: 'bg-accent/10 text-accent border border-accent/30',
    dot: 'bg-accent',
  },
  question: {
    label: 'QUESTION',
    classes: 'bg-surface text-text-primary border border-light/20',
    dot: 'bg-light',
  },
  end: {
    label: 'END',
    classes: 'bg-red-500/10 text-red-300 border border-red-400/40',
    dot: 'bg-red-300',
  },
};

export const Badge: React.FC<BadgeProps> = ({ type, showDot = true, className, ...props }) => {
  const cfg = badgeConfig[type];

  return (
    <span
      {...props}
      className={clsx(
        'inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-widest',
        cfg.classes,
        className,
      )}
    >
      {showDot && <span className={clsx('w-1.5 h-1.5 rounded-full animate-pulse', cfg.dot)} />}
      {cfg.label}
    </span>
  );
};