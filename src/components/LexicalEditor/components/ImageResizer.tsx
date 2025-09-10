import React, { useRef, useCallback, useEffect } from 'react';
import { LexicalEditor } from 'lexical';

interface ImageResizerProps {
  editor: LexicalEditor;
  imageRef: React.RefObject<HTMLImageElement>;
  onResizeEnd: (width: number, height: number) => void;
  onResizeStart: () => void;
}

const MIN_WIDTH = 100;
const MIN_HEIGHT = 100;

export default function ImageResizer({
  editor,
  imageRef,
  onResizeEnd,
  onResizeStart,
}: ImageResizerProps): JSX.Element {
  const controlWrapperRef = useRef<HTMLDivElement>(null);
  const userSelect = useRef({
    priority: '',
    value: 'default',
  });
  const positioningRef = useRef<{
    currentHeight: number;
    currentWidth: number;
    direction: string;
    isResizing: boolean;
    ratio: number;
    startHeight: number;
    startWidth: number;
    startX: number;
    startY: number;
  }>({
    currentHeight: 0,
    currentWidth: 0,
    direction: '',
    isResizing: false,
    ratio: 0,
    startHeight: 0,
    startWidth: 0,
    startX: 0,
    startY: 0,
  });

  const setStartCursor = (direction: string) => {
    const editorElem = editor.getRootElement();
    if (editorElem !== null) {
      editorElem.style.cursor = `${direction}-resize`;
      userSelect.current.value = editorElem.style.userSelect;
      userSelect.current.priority = editorElem.style.getPropertyPriority('user-select');
      editorElem.style.setProperty('user-select', 'none', 'important');
    }
  };

  const setEndCursor = () => {
    const editorElem = editor.getRootElement();
    if (editorElem !== null) {
      editorElem.style.cursor = '';
      editorElem.style.setProperty(
        'user-select',
        userSelect.current.value,
        userSelect.current.priority,
      );
    }
  };

  const handlePointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>, direction: string) => {
      event.preventDefault();
      event.stopPropagation();

      const image = imageRef.current;
      if (!image) return;

      const { width, height } = image.getBoundingClientRect();
      
      const positioning = positioningRef.current;
      positioning.startWidth = width;
      positioning.startHeight = height;
      positioning.ratio = width / height;
      positioning.currentWidth = width;
      positioning.currentHeight = height;
      positioning.startX = event.clientX;
      positioning.startY = event.clientY;
      positioning.isResizing = true;
      positioning.direction = direction;

      setStartCursor(direction);
      onResizeStart();

      document.addEventListener('pointermove', handlePointerMove);
      document.addEventListener('pointerup', handlePointerUp);
    },
    [imageRef, onResizeStart],
  );

  const handlePointerMove = useCallback(
    (event: PointerEvent) => {
      const image = imageRef.current;
      const positioning = positioningRef.current;

      if (!image || !positioning.isResizing) {
        return;
      }

      const diff = {
        x: event.clientX - positioning.startX,
        y: event.clientY - positioning.startY,
      };

      const direction = positioning.direction;
      let newWidth = positioning.startWidth;
      let newHeight = positioning.startHeight;

      if (direction === 'nw' || direction === 'ne' || direction === 'se' || direction === 'sw') {
        // For corner handles, we'll use the larger dimension change to maintain aspect ratio
        if (direction === 'se') {
          // Bottom-right: both x and y are positive
          newWidth = positioning.startWidth + diff.x;
        } else if (direction === 'sw') {
          // Bottom-left: x is negative, y is positive
          newWidth = positioning.startWidth - diff.x;
        } else if (direction === 'ne') {
          // Top-right: x is positive, y is negative
          newWidth = positioning.startWidth + diff.x;
        } else if (direction === 'nw') {
          // Top-left: both x and y are negative
          newWidth = positioning.startWidth - diff.x;
        }

        // Calculate height based on the aspect ratio
        newHeight = newWidth / positioning.ratio;
      }

      // Apply constraints
      const editorElem = editor.getRootElement();
      const maxWidth = editorElem ? editorElem.getBoundingClientRect().width - 40 : 800;
      
      newWidth = Math.max(MIN_WIDTH, Math.min(newWidth, maxWidth));
      newHeight = newWidth / positioning.ratio;

      // Update positioning
      positioning.currentWidth = newWidth;
      positioning.currentHeight = newHeight;

      // Update image dimensions
      image.style.width = `${newWidth}px`;
      image.style.height = `${newHeight}px`;
    },
    [editor, imageRef],
  );

  const handlePointerUp = useCallback(
    () => {
      const image = imageRef.current;
      const positioning = positioningRef.current;

      if (!image || !positioning.isResizing) {
        return;
      }

      positioning.isResizing = false;
      setEndCursor();

      onResizeEnd(positioning.currentWidth, positioning.currentHeight);

      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerup', handlePointerUp);
    },
    [imageRef, onResizeEnd, handlePointerMove],
  );

  useEffect(() => {
    return () => {
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerup', handlePointerUp);
    };
  }, [handlePointerMove, handlePointerUp]);

  return (
    <div
      ref={controlWrapperRef}
      className="absolute inset-0 pointer-events-none"
    >
      {/* Top Left */}
      <div
        className="absolute w-4 h-4 bg-primary rounded-full cursor-nw-resize pointer-events-auto hover:scale-125 transition-transform shadow-md"
        style={{ top: '-8px', left: '-8px' }}
        onPointerDown={(e) => handlePointerDown(e, 'nw')}
      />
      {/* Top Right */}
      <div
        className="absolute w-4 h-4 bg-primary rounded-full cursor-ne-resize pointer-events-auto hover:scale-125 transition-transform shadow-md"
        style={{ top: '-8px', right: '-8px' }}
        onPointerDown={(e) => handlePointerDown(e, 'ne')}
      />
      {/* Bottom Left */}
      <div
        className="absolute w-4 h-4 bg-primary rounded-full cursor-sw-resize pointer-events-auto hover:scale-125 transition-transform shadow-md"
        style={{ bottom: '-8px', left: '-8px' }}
        onPointerDown={(e) => handlePointerDown(e, 'sw')}
      />
      {/* Bottom Right */}
      <div
        className="absolute w-4 h-4 bg-primary rounded-full cursor-se-resize pointer-events-auto hover:scale-125 transition-transform shadow-md"
        style={{ bottom: '-8px', right: '-8px' }}
        onPointerDown={(e) => handlePointerDown(e, 'se')}
      />
    </div>
  );
}