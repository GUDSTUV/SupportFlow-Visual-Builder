import React from 'react';
import { Header } from '../../organisms/Header/Header';
import { Footer } from '../../organisms/Footer/Footer';
import { Canvas } from '../../organisms/Canvas/Canvas';
import { EditPanel } from '../../organisms/EditPanel/EditPanel';
import { useFlowStore } from '../../../store/flowStore';

const BuilderPage: React.FC = () => {
  const selectedNodeId = useFlowStore((state) => state.selectedNodeId);

  return (
    <div className="min-h-svh w-full flex flex-col bg-canvas text-text-primary">
      <Header />
      <main className="flex-1 bg-canvas overflow-hidden flex gap-0">
        <div className="flex-1 overflow-hidden">
          <Canvas />
        </div>
        {selectedNodeId ? <EditPanel /> : null}
      </main>
      <Footer />
    </div>
  );
};

export default BuilderPage;
