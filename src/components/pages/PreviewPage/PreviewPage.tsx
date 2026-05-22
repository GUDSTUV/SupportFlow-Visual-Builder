import React from 'react';
import { Header } from '../../organisms/Header/Header';
import { Footer } from '../../organisms/Footer/Footer';
import { PreviewChat } from '../../organisms/PreviewChat/PreviewChat';

const PreviewPage: React.FC = () => {
  return (
    <div className="min-h-svh w-full flex flex-col bg-canvas text-text-primary">
      <Header />
      <main className="flex-1 bg-canvas px-4 py-4 sm:px-6 sm:py-6">
        <PreviewChat />
      </main>
      <Footer />
    </div>
  );
};

export default PreviewPage;
