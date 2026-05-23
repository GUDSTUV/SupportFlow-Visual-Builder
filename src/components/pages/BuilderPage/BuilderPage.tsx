import React from 'react';
import { Header } from '../../organisms/Header/BuilderHeader';
import { Footer } from '../../organisms/Footer/Footer';
import { Canvas } from '../../organisms/Canvas/Canvas';
import { EditPanel } from '../../organisms/EditPanel/EditPanel';
import PreviewPage from '../PreviewPage/PreviewPage';
import { useFlowStore } from '../../../store/flowStore';

const BuilderPage: React.FC = () => {
  const selectedNodeId = useFlowStore((state) => state.selectedNodeId);
  const mode = useFlowStore((state) => state.mode);

  return (
    <div className="h-svh w-full flex flex-col bg-canvas text-text-primary">
      {mode === 'preview' ? null : <Header />}
      <main className="flex-1 min-h-0 bg-canvas overflow-hidden flex gap-0">
        {mode === 'preview' ? (
          <PreviewPage />
        ) : (
          <>
            <div className="flex-1 overflow-hidden">
              <Canvas />
            </div>
            {selectedNodeId ? <EditPanel /> : null}
          </>
        )}
      </main>
      {mode === 'preview' ? null : <Footer />}
    </div>
  );
};

export default BuilderPage;
