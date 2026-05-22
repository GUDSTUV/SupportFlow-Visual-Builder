import React, { useEffect, useRef, useCallback } from 'react';
import { useFlowStore } from '../../../store/flowStore';
import { useShallow } from 'zustand/react/shallow';
import { NodeCard } from '../NodeCard/NodeCard';
import { EdgeLayer } from '../EdgeLayer/EdgeLayer';

export const Canvas: React.FC = () => {
  const {
    nodes,
    selectedNodeId,
    selectNode,
    canvasOffset,
    canvasScale,
    setCanvasOffset,
    setCanvasScale,
  } = useFlowStore(
    useShallow((state) => ({
      nodes: state.nodes,
      selectedNodeId: state.selectedNodeId,
      selectNode: state.selectNode,
      canvasOffset: state.canvasOffset,
      canvasScale: state.canvasScale,
      setCanvasOffset: state.setCanvasOffset,
      setCanvasScale: state.setCanvasScale,
    })),
  );

  const isPanning = useRef(false);
  const isDraggingNode = useRef(false);
  const panStart = useRef({ x: 0, y: 0, ox: 0, oy: 0 });
  const dragStart = useRef({ id: '', x: 0, y: 0, pointerX: 0, pointerY: 0 });
  const dragPointer = useRef<{ id: number; el: HTMLDivElement | null }>({ id: -1, el: null });
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Pan on middle-mouse or alt+drag
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (e.button === 1 || e.altKey) {
        isPanning.current = true;
        panStart.current = { x: e.clientX, y: e.clientY, ox: canvasOffset.x, oy: canvasOffset.y };
        e.preventDefault();
      } else {
        // Deselect when clicking empty canvas
        selectNode(null);
      }
    },
    [canvasOffset, selectNode]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isPanning.current) return;
      const dx = e.clientX - panStart.current.x;
      const dy = e.clientY - panStart.current.y;
      setCanvasOffset(panStart.current.ox + dx, panStart.current.oy + dy);
    },
    [setCanvasOffset]
  );

  const handleMouseUp = useCallback(() => {
    isPanning.current = false;
  }, []);

  const handleNodePointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>, id: string) => {
      event.stopPropagation();
      selectNode(id);

      const container = containerRef.current;
      if (!container) return;

      const node = nodes.find((current) => current.id === id);
      if (!node) return;

      const rect = container.getBoundingClientRect();
      const contentX = (event.clientX - rect.left - canvasOffset.x) / canvasScale;
      const contentY = (event.clientY - rect.top - canvasOffset.y) / canvasScale;

      isDraggingNode.current = true;
      dragStart.current = {
        id,
        x: node.position.x,
        y: node.position.y,
        pointerX: contentX,
        pointerY: contentY,
      };
      dragPointer.current = { id: event.pointerId, el: event.currentTarget };
      event.currentTarget.setPointerCapture(event.pointerId);
    },
    [canvasOffset, canvasScale, nodes, selectNode],
  );

  useEffect(() => {
    const handleWindowPointerMove = (event: PointerEvent) => {
      if (!isDraggingNode.current) return;
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const contentX = (event.clientX - rect.left - canvasOffset.x) / canvasScale;
      const contentY = (event.clientY - rect.top - canvasOffset.y) / canvasScale;
      const dx = contentX - dragStart.current.pointerX;
      const dy = contentY - dragStart.current.pointerY;

      useFlowStore.getState().moveNode(dragStart.current.id, dragStart.current.x + dx, dragStart.current.y + dy);
    };

    const handleWindowPointerUp = () => {
      isDraggingNode.current = false;
      if (dragPointer.current.el && dragPointer.current.el.hasPointerCapture(dragPointer.current.id)) {
        dragPointer.current.el.releasePointerCapture(dragPointer.current.id);
      }
      dragPointer.current = { id: -1, el: null };
    };

    window.addEventListener('pointermove', handleWindowPointerMove);
    window.addEventListener('pointerup', handleWindowPointerUp);

    return () => {
      window.removeEventListener('pointermove', handleWindowPointerMove);
      window.removeEventListener('pointerup', handleWindowPointerUp);
    };
  }, [canvasOffset, canvasScale]);

  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault();
      if (e.altKey) {
        const delta = -e.deltaY * 0.001;
        setCanvasScale(Math.max(0.3, Math.min(2, canvasScale + delta)));
      } else {
        setCanvasOffset(canvasOffset.x - e.deltaX, canvasOffset.y - e.deltaY);
      }
    },
    [canvasScale, canvasOffset, setCanvasScale, setCanvasOffset]
  );

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full overflow-hidden bg-canvas cursor-default"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
    >
      {/* Dot grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(179, 186, 164, 0.12) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          backgroundPosition: `${canvasOffset.x % 28}px ${canvasOffset.y % 28}px`,
        }}
      />

      {/* Transformable canvas content */}
      <div
        ref={contentRef}
        className="absolute top-0 left-0"
        style={{
          transform: `translate(${canvasOffset.x}px, ${canvasOffset.y}px) scale(${canvasScale})`,
          transformOrigin: '0 0',
          width: 1600,
          height: 1200,
        }}
      >
        {/* SVG edges layer — behind nodes */}
        <EdgeLayer nodes={nodes} containerRef={contentRef} />

        {/* Node cards */}
        {nodes.map((node) => (
          <NodeCard
            key={node.id}
            node={node}
            isSelected={selectedNodeId === node.id}
            onSelect={selectNode}
            onPointerDown={handleNodePointerDown}
          />
        ))}
      </div>

      {/* Canvas overlays moved to footer */}
    </div>
  );
};
