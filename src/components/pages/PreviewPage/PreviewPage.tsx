import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useFlowStore } from '../../../store/flowStore';
import { ChatBubble } from '../../molecules/ChatBubble/ChatBubbles';
import { Button } from '../../atoms/Button/Buttons';
import { PreviewHeader } from '../../organisms/Header/PreviewHeader';

type ChatEntry = {
	id: string;
	author: 'bot' | 'user';
	text: string;
	nodeId?: string;
};

const PreviewPage: React.FC = () => {
	const nodes = useFlowStore((state) => state.nodes);
	const startNode = useMemo(
		() => nodes.find((node) => node.type === 'start') ?? nodes[0],
		[nodes],
	);
	const idCounter = useRef(1);
	const [currentNodeId, setCurrentNodeId] = useState(() => startNode?.id ?? '');
	const [transcript, setTranscript] = useState<ChatEntry[]>(() => {
		if (!startNode) return [];
		return [{ id: 'bot-1', author: 'bot', text: startNode.text, nodeId: startNode.id }];
	});

	const createEntry = useCallback((author: ChatEntry['author'], text: string, nodeId?: string) => {
		idCounter.current += 1;
		return { id: `${author}-${idCounter.current}`, author, text, nodeId };
	}, []);

	const resetConversation = useCallback(() => {
		if (!startNode) return;
		idCounter.current = 1;
		setTranscript([{ id: 'bot-1', author: 'bot', text: startNode.text, nodeId: startNode.id }]);
		setCurrentNodeId(startNode.id);
	}, [startNode]);

	const currentNode = nodes.find((node) => node.id === currentNodeId);
	const isLeaf = !currentNode || currentNode.options.length === 0;

	const handleOptionSelect = (label: string, nextId: string) => {
		const nextNode = nodes.find((node) => node.id === nextId);
		setTranscript((prev) => {
			const nextEntries = [createEntry('user', label || 'Selected option')];
			if (nextNode) {
				nextEntries.push(createEntry('bot', nextNode.text, nextNode.id));
			} else {
				nextEntries.push(createEntry('bot', 'This path points to a missing node.'));
			}
			return [...prev, ...nextEntries];
		});
		setCurrentNodeId(nextNode?.id ?? '');
	};

	return (
		<div className="flex-1 min-h-0 w-full flex flex-col">
			<PreviewHeader />

			<div className="flex-1 min-h-0 overflow-y-auto px-6 py-6">
				<div className="w-full max-w-3xl mx-auto flex flex-col gap-4">
					{!startNode ? (
						<div className="min-h-50 flex items-center justify-center text-sm text-accent/60">
							No start node found. Add a start node to preview the flow.
						</div>
					) : (
						<>
							{transcript.map((entry) => (
								<ChatBubble key={entry.id} message={entry.text} isBot={entry.author === 'bot'} />
							))}

							{currentNode && currentNode.options.length > 0 ? (
								<div className="flex flex-wrap gap-2 justify-end">
									{currentNode.options.map((option, index) => (
										<Button
											key={`${option.nextId}-${index}`}
											variant="ghost"
											size="sm"
											onClick={() => handleOptionSelect(option.label, option.nextId)}
										>
											{option.label || `Option ${index + 1}`}
										</Button>
									))}
								</div>
							) : null}

							{isLeaf && startNode ? (
								<div className="mt-4  p-4 flex flex-col items-end gap-3">
									<p className="text-xs text-accent/60">End of conversation</p>
									<Button variant="primary" size="sm" onClick={resetConversation}>
										Restart
									</Button>
								</div>
							) : null}
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default PreviewPage;
