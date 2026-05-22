import React from 'react';
import clsx from 'clsx';

type ButtonVariant = 'primary' | 'ghost' | 'danger' | 'play';
type ButtonSize = 'sm' | 'md' | 'lg';
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}
const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-brand hover:bg-brand/90 text-text-primary border border-accent/30',
  ghost:
    'bg-transparent hover:bg-surface text-accent hover:text-text-primary border border-transparent',
  danger:
    'bg-red-500/10 hover:bg-red-500/20 text-red-300 border border-red-500/30',
  play: 'bg-accent hover:bg-accent/90 text-canvas border border-accent/40',
};
const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-2.5 py-1 text-xs gap-1.5',
  md: 'px-4 py-2 text-sm gap-2',
  lg: 'px-6 py-3 text-base gap-2.5',
};
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  children,
  className = '',
  ...props
}) => {
  const buttonType = props.type ?? 'button';

  return (
    <button
      {...props}
      type={buttonType}
      className={clsx(
        'inline-flex items-center justify-center font-medium rounded-lg',
        'transition-all duration-150 ease-out',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50',
        'focus-visible:ring-offset-2 focus-visible:ring-offset-canvas',
        'disabled:opacity-40 disabled:cursor-not-allowed',
        'cursor-pointer select-none',
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </button>
  );
};