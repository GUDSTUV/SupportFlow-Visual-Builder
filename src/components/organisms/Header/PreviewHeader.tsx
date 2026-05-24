import React from 'react';
import { LayoutDashboard } from 'lucide-react';
import { Button } from '../../atoms/Button/Buttons';
import { Typography } from '../../atoms/Typography/Typography';
import { useFlowStore } from '../../../store/flowStore';

export const PreviewHeader: React.FC = () => {
	const setMode = useFlowStore((state) => state.setMode);

	return (
		<header className="relative flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-0 sm:h-16 bg-brand border-b border-accent/20">
			<div className="flex items-center gap-3">
				<div className="flex flex-col">
					<Typography variant="heading" size="md" className="text-base sm:text-lg">
						SupportFlow Preview
					</Typography>
					<Typography variant="label" size="sm" className="text-[10px] sm:text-xs text-accent/60">
						Test the customer experience
					</Typography>
				</div>
			</div>

			<div className="hidden sm:block pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] sm:text-[15px] text-accent/40">
				Preview mode · Click an option to continue
			</div>

			<div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-start sm:justify-end">
				
				<Button
					variant="primary"
					size="sm"
					icon={<LayoutDashboard className="h-4 w-4" />}
					onClick={() => setMode('editor')}
				>
					Back to Builder
				</Button>
			</div>
		</header>
	);
};
