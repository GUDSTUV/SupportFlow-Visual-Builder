import React from 'react';
import type { Option } from '../../../types/flow';
interface NodeAnswersProps {
  options: Option[];
  nodeType: 'start' | 'question' | 'end';
}
export const NodeAnswers: React.FC<NodeAnswersProps> = ({ options, nodeType }) => {
  if (nodeType === 'end' || options.length === 0) return null;
  return (
    <div className="mt-3 flex flex-col gap-1.5">
      {options.map((opt, i) => (
        <div
          key={i}
          className="flex items-center gap-2 px-2.5 py-1.5 rounded-md bg-canvas border border-accent/10 group"
        >
          <span className="w-4 h-4 rounded-full bg-brand border border-accent/30 flex items-center justify-center text-[9px] text-accent font-bold shrink-0">
            {i + 1}
          </span>
          <span className="text-[11px] text-light/80 truncate flex-1">{opt.label}</span>
          <span className="text-[9px] text-accent/40 font-medium tracking-wide shrink-0">→{opt.nextId}</span>
        </div>
      ))}
    </div>
  );
};
