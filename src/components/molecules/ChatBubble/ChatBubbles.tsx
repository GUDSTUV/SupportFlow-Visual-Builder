import React from 'react';
import clsx from 'clsx';

interface ChatBubbleProps {
  message: string;
  isBot: boolean;
  animate?: boolean;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ message, isBot, animate = true }) => {
  return (
    <div
      className={clsx('flex', isBot ? 'justify-start' : 'justify-end', animate && 'animate-fadeIn')}
    >
      {isBot && (
        <div className="w-8 h-8 rounded-full bg-brand border border-accent/30 flex items-center justify-center text-xs font-bold text-accent mr-2 shrink-0 mt-1">
          AI
        </div>
      )}
      <div
        className={clsx(
          'max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed border border-accent/20',
          isBot
            ? 'bg-surface text-text-primary rounded-tl-sm'
            : 'bg-brand text-light rounded-tr-sm',
        )}
      >
        {message}
      </div>
    </div>
  );
};