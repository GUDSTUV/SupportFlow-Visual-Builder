import React from 'react';
import { ChatBubble } from '../../molecules/ChatBubble/ChatBubbles';
import { Button } from '../../atoms/Button/Buttons';

export const PreviewChat: React.FC = () => {
  return (
    <section className="w-full max-w-3xl mx-auto flex flex-col gap-4">
      <ChatBubble message="Welcome to Support. What is your issue?" isBot />
      <div className="flex flex-wrap gap-2 justify-end">
        <Button variant="ghost" size="sm">
          Internet is down
        </Button>
        <Button variant="ghost" size="sm">
          Billing question
        </Button>
      </div>
      <ChatBubble message="Let’s check a few things." isBot />
      <ChatBubble message="My connection dropped." isBot={false} />
    </section>
  );
};
