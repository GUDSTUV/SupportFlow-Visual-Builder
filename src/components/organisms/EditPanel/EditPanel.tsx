import React from 'react';
import { useFlowStore } from '../../../store/flowStore';
import { Textarea } from '../../atoms/Input/Input';
import { TextInput } from '../../atoms/Input/Input';
import { Button } from '../../atoms/Button/Buttons';
import { Badge } from '../../atoms/Badge/Badge';
export const EditPanel: React.FC = () => {
  const nodes = useFlowStore((s) => s.nodes);
  const selectedNodeId = useFlowStore((s) => s.selectedNodeId);
  const selectNode = useFlowStore((s) => s.selectNode);
  const updateNodeText = useFlowStore((s) => s.updateNodeText);
  const updateOptionLabel = useFlowStore((s) => s.updateOptionLabel);
  const updateOptionTarget = useFlowStore((s) => s.updateOptionTarget);
  const addOption = useFlowStore((s) => s.addOption);
  const removeOption = useFlowStore((s) => s.removeOption);
  const node = nodes.find((n) => n.id === selectedNodeId);
  if (!node) {
    return (
      <aside className="w-72 bg-brand border-l border-accent/10 flex flex-col items-center justify-center p-6 shrink-0">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-surface border border-accent/10 flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl text-accent/40">✎</span>
          </div>
          <p className="text-accent/60 text-sm">Select a node to edit</p>
          <p className="text-accent/30 text-xs mt-1">Click any card on the canvas</p>
        </div>
      </aside>
    );
  }
  return (
    <aside className="w-72 bg-brand border-l border-accent/10 flex flex-col shrink-0 min-h-0 overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-accent/10 flex items-center justify-between">
        <div>
          <p className="text-xs text-accent/60 uppercase tracking-widest font-semibold mb-1">Editing</p>
          <div className="flex items-center gap-2">
            <Badge type={node.type} />
            <span className="text-xs text-accent/40 font-mono">#{node.id}</span>
          </div>
        </div>
        <button
          onClick={() => selectNode(null)}
          className="w-7 h-7 rounded-lg bg-surface border border-accent/10 flex items-center justify-center text-accent/40 hover:text-text-primary hover:border-accent/30 transition-all text-sm cursor-pointer"
        >
          ✕
        </button>
      </div>
      {/* Scrollable content */}
      <div className="flex-1 min-h-0 overflow-y-auto p-5 space-y-6 custom-scrollbar">
        {/* Question Text */}
        <section>
          <Textarea
            label="Question / Message Text"
            value={node.text}
            rows={4}
            onChange={(e) => updateNodeText(node.id, e.target.value)}
            placeholder="Enter the message..."
          />
        </section>
        {/* Answer Options */}
        {node.type !== 'end' && (
          <section>
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold text-accent uppercase tracking-wider">Answer Options</p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => addOption(node.id)}
                icon={<span>+</span>}
              >
                Add
              </Button>
            </div>
            <div className="space-y-3">
              {node.options.map((opt, i) => (
                <div key={i} className="bg-canvas rounded-xl p-3 border border-accent/10 space-y-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] text-accent/50 uppercase tracking-widest font-semibold">Option {i + 1}</span>
                    <button
                      onClick={() => removeOption(node.id, i)}
                      className="text-red-400/50 hover:text-red-400 text-xs transition-colors cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>
                  <TextInput
                    label="Label"
                    value={opt.label}
                    onChange={(e) => updateOptionLabel(node.id, i, e.target.value)}
                    placeholder="Option label..."
                  />
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-accent uppercase tracking-wider">Goes to Node</label>
                    <select
                      value={opt.nextId}
                      onChange={(e) => updateOptionTarget(node.id, i, e.target.value)}
                      className="w-full bg-canvas border border-accent/20 rounded-lg text-text-primary text-sm px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-accent/40 cursor-pointer"
                    >
                      {nodes
                        .filter((n) => n.id !== node.id)
                        .map((n) => (
                          <option key={n.id} value={n.id} className="bg-surface">
                            #{n.id} — {n.text.slice(0, 28)}...
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              ))}
            </div>
            {node.options.length === 0 && (
              <div className="text-center py-6 text-accent/30 text-xs border border-dashed border-accent/10 rounded-xl">
                No options yet. Click "Add" to create one.
              </div>
            )}
          </section>
        )}
        {/* Node position info */}
        <section>
          <p className="text-xs font-semibold text-accent uppercase tracking-wider mb-2">Position</p>
          <div className="flex gap-2">
            <div className="flex-1 bg-canvas border border-accent/10 rounded-lg px-3 py-2">
              <p className="text-[9px] text-accent/40 uppercase tracking-widest">X</p>
              <p className="text-sm text-text-primary font-mono">{Math.round(node.position.x)}</p>
            </div>
            <div className="flex-1 bg-canvas border border-accent/10 rounded-lg px-3 py-2">
              <p className="text-[9px] text-accent/40 uppercase tracking-widest">Y</p>
              <p className="text-sm text-text-primary font-mono">{Math.round(node.position.y)}</p>
            </div>
          </div>
        </section>
      </div>
    </aside>
  );
};
