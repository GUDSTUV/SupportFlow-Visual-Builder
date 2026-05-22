import React from 'react';
import { Eye, LayoutDashboard, Redo2, Undo2 } from 'lucide-react';
import { Button } from '../../atoms/Button/Buttons';
import { Typography } from '../../atoms/Typography/Typography';
import { useFlowStore } from '../../../store/flowStore';

export const Header: React.FC = () => {
  const {
    mode,
    setMode,
    undo,
    redo,
    canUndo,
    canRedo,
  } = useFlowStore(state => ({
    mode: state.mode,
    setMode: state.setMode,
    undo: state.undo,
    redo: state.redo,
    canUndo: state.history.length > 0,
    canRedo: state.future.length > 0,
  }));

  const isPreview = mode === 'preview';

  return (
    <header className="flex items-center justify-between px-6 h-16 bg-brand border-b border-accent/20">
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-lg bg-canvas border border-accent/20 flex items-center justify-center text-accent text-xs font-semibold">
          SF
        </div>
        <div className="flex flex-col">
          <Typography variant="heading" size="md">
            SupportFlow Builder
          </Typography>
          <Typography variant="label" size="sm" className="text-accent/60">
            Visual Decision Tree
          </Typography>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          icon={<Undo2 className="h-4 w-4" />}
          onClick={undo}
          disabled={!canUndo}
        >
          Undo
        </Button>
        <Button
          variant="ghost"
          size="sm"
          icon={<Redo2 className="h-4 w-4" />}
          onClick={redo}
          disabled={!canRedo}
        >
          Redo
        </Button>
        <div className="h-6 w-px bg-accent/20 mx-1" />
        <Button
          variant="play"
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
