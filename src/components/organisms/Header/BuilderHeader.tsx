import React, { useEffect, useRef, useState } from 'react';
import { Eye, LayoutDashboard, Plus, Redo2, Undo2 } from 'lucide-react';
import { Button } from '../../atoms/Button/Buttons';
import { Typography } from '../../atoms/Typography/Typography';
import { useFlowStore } from '../../../store/flowStore';
import { useShallow } from 'zustand/react/shallow';

export const Header: React.FC = () => {
  const {
    mode,
    setMode,
    undo,
    redo,
    canUndo,
    canRedo,
    addNode,
  } = useFlowStore(
    useShallow(state => ({
      mode: state.mode,
      setMode: state.setMode,
      undo: state.undo,
      redo: state.redo,
      canUndo: state.history.length > 0,
      canRedo: state.future.length > 0,
      addNode: state.addNode,
    })),
  );

  const isPreview = mode === 'preview';
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const handleOutsideClick = (event: MouseEvent) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('mousedown', handleOutsideClick);
    return () => window.removeEventListener('mousedown', handleOutsideClick);
  }, [menuOpen]);

  return (
    <header className="relative z-30 flex flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:justify-between md:px-6 md:py-0 md:h-16 bg-brand border-b border-accent/20">
      <div className="flex items-center gap-3">
        <div className="flex flex-col">
          <Typography variant="heading" size="md" className="text-base md:text-lg">
            SupportFlow Builder
          </Typography>
          <Typography variant="label" size="sm" className="text-[10px] md:text-xs text-accent/60">
            Visual Decision Tree
          </Typography>
          <div className="hidden md:block lg:hidden text-[10px] text-accent/60 mt-0.5">
            Alt+drag to pan · Alt+scroll to zoom · Click node to edit
          </div>
        </div>
      </div>

      <div className="hidden lg:block pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] lg:text-[15px] text-accent/40">
        Alt+drag to pan · Alt+scroll to zoom · Click node to edit
      </div>

      <div className="hidden md:flex flex-wrap items-center gap-2 w-full md:w-auto justify-start md:justify-end">
        <div className="relative" ref={menuRef}>
          <Button
            variant="ghost"
            size="sm"
            icon={<Plus className="h-4 w-4" />}
            onClick={() => setMenuOpen((open) => !open)}
          >
            Add Node
          </Button>
          {menuOpen ? (
            <div className="absolute right-0 mt-2 w-44 rounded-xl border border-accent/20 bg-surface/95 shadow-lg shadow-black/40 backdrop-blur z-40">
              <button
                className="w-full px-3 py-2 text-left text-xs text-text-primary hover:bg-canvas/70 transition-colors"
                onClick={() => {
                  addNode('start');
                  setMenuOpen(false);
                }}
              >
                Start Node
              </button>
              <button
                className="w-full px-3 py-2 text-left text-xs text-text-primary hover:bg-canvas/70 transition-colors"
                onClick={() => {
                  addNode('question');
                  setMenuOpen(false);
                }}
              >
                Question Node
              </button>
              <button
                className="w-full px-3 py-2 text-left text-xs text-text-primary hover:bg-canvas/70 transition-colors"
                onClick={() => {
                  addNode('end');
                  setMenuOpen(false);
                }}
              >
                End Node
              </button>
            </div>
          ) : null}
        </div>
        <Button
          variant="primary"
          size="sm"
          icon={<Undo2 className="h-4 w-4" />}
          onClick={undo}
          disabled={!canUndo}
        >
          Undo
        </Button>
        <Button
          variant="primary"
          size="sm"
          icon={<Redo2 className="h-4 w-4" />}
          onClick={redo}
          disabled={!canRedo}
        >
          Redo
        </Button>
        <div className="h-6 w-px bg-accent/20 mx-1" />
        <Button
          variant={isPreview ? 'primary' : 'play'}
          size="sm"
          icon={isPreview ? <LayoutDashboard className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          onClick={() => setMode(isPreview ? 'editor' : 'preview')}
        >
          {isPreview ? 'Builder' : 'Preview'}
        </Button>
      </div>
    </header>
  );
};
