import React from 'react';
import type { ElementType } from 'react';
import clsx from 'clsx';

type TypographyVariant = 'heading' | 'body' | 'label';
type TypographySize = 'sm' | 'md' | 'lg' | 'xl';

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
	as?: ElementType;
	variant?: TypographyVariant;
	size?: TypographySize;
}

const variantClasses: Record<TypographyVariant, string> = {
	heading: 'text-text-primary font-semibold tracking-tight leading-tight',
	body: 'text-text-primary/90 leading-relaxed',
	label: 'text-accent uppercase tracking-wider font-semibold',
};

const variantSizeClasses: Record<TypographyVariant, Record<TypographySize, string>> = {
	heading: {
		sm: 'text-base',
		md: 'text-lg',
		lg: 'text-2xl',
		xl: "",
	},
	body: {
		sm: 'text-xs',
		md: 'text-sm',
		lg: 'text-base',
		xl: "",
	},
	label: {
		sm: 'text-xs',
		md: 'text-sm',
		lg: 'text-base',
		xl: 'text-xxl',
	},
};

export const Typography: React.FC<TypographyProps> = ({
	as,
	variant = 'body',
	size,
	className,
	...props
}) => {
	const Component = as ?? (variant === 'heading' ? 'h2' : variant === 'label' ? 'span' : 'p');
	const resolvedSize = size ?? (variant === 'heading' ? 'lg' : variant === 'label' ? 'sm' : 'md');

	return (
		<Component
			{...props}
			className={clsx(
				variantClasses[variant],
				variantSizeClasses[variant][resolvedSize],
				className,
			)}
		/>
	);
};
