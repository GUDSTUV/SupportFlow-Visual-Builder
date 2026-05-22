import React from 'react';
import clsx from 'clsx';

interface InputProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const fieldBaseClasses =
  'w-full bg-canvas border border-accent/20 rounded-lg text-text-primary text-sm placeholder:text-accent/50 px-3 py-2.5 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:border-accent/40';

export const Textarea: React.FC<InputProps> = ({ label, className, id, ...props }) => {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-xs font-semibold text-accent uppercase tracking-wider">
          {label}
        </label>
      )}
      <textarea
        {...props}
        id={id}
        className={clsx(fieldBaseClasses, 'resize-none', className)}
      />
    </div>
  );
};

export const TextInput: React.FC<TextInputProps> = ({ label, className, id, ...props }) => {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-xs font-semibold text-accent uppercase tracking-wider">
          {label}
        </label>
      )}
      <input
        {...props}
        id={id}
        className={clsx(fieldBaseClasses, className)}
      />
    </div>
  );
};