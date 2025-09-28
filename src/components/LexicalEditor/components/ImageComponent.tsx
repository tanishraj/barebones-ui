import React, { useRef, useEffect, useState, useCallback, Suspense } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useLexicalNodeSelection } from '@lexical/react/useLexicalNodeSelection';
import { mergeRegister } from '@lexical/utils';
import {
  $getNodeByKey,
  $getSelection,
  $isNodeSelection,
  CLICK_COMMAND,
  COMMAND_PRIORITY_LOW,
  DRAGSTART_COMMAND,
  KEY_BACKSPACE_COMMAND,
  KEY_DELETE_COMMAND,
  KEY_ESCAPE_COMMAND,
  NodeKey,
} from 'lexical';

import { $isImageNode } from '../nodes/ImageNode';

const ImageResizer = React.lazy(() => import('./ImageResizer'));

interface ImageComponentProps {
  src: string;
  altText: string;
  width: 'inherit' | number;
  height: 'inherit' | number;
  maxWidth: number;
  nodeKey: NodeKey;
}

export default function ImageComponent({
  src,
  altText,
  width,
  height,
  maxWidth,
  nodeKey,
}: ImageComponentProps): JSX.Element {
  const imageRef = useRef<HTMLImageElement>(null);
  const [isSelected, setSelected, clearSelection] = useLexicalNodeSelection(nodeKey);
  const [editor] = useLexicalComposerContext();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isResizing, setIsResizing] = useState(false);

  const onDelete = useCallback(
    (event: KeyboardEvent) => {
      if (isSelected && $isNodeSelection($getSelection())) {
        event.preventDefault();
        const node = $getNodeByKey(nodeKey);
        if ($isImageNode(node)) {
          node.remove();
        }
      }
      return false;
    },
    [isSelected, nodeKey],
  );

  const onClick = useCallback(
    (event: MouseEvent) => {
      if (event.target === imageRef.current) {
        clearSelection();
        setSelected(true);
        return true;
      }
      return false;
    },
    [clearSelection, setSelected],
  );

  const onDragStart = useCallback(
    (event: DragEvent) => {
      if (event.target === imageRef.current && imageRef.current) {
        event.dataTransfer?.setDragImage(imageRef.current, 0, 0);
      }
      return true;
    },
    [],
  );

  const onResizeEnd = useCallback(
    (nextWidth: number, nextHeight: number) => {
      // Update the ImageNode with new dimensions
      editor.update(() => {
        const node = $getNodeByKey(nodeKey);
        if ($isImageNode(node)) {
          node.setWidthAndHeight(nextWidth, nextHeight);
        }
      });
      setIsResizing(false);
    },
    [editor, nodeKey],
  );

  const onResizeStart = useCallback(() => {
    setIsResizing(true);
  }, []);

  const onEscape = useCallback(
    (event: KeyboardEvent) => {
      if (isSelected) {
        event.preventDefault();
        clearSelection();
        setSelected(false);
        return true;
      }
      return false;
    },
    [isSelected, clearSelection, setSelected],
  );

  useEffect(() => {
    return mergeRegister(
      editor.registerCommand(
        CLICK_COMMAND,
        onClick,
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand(
        DRAGSTART_COMMAND,
        onDragStart,
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand(
        KEY_DELETE_COMMAND,
        onDelete,
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand(
        KEY_BACKSPACE_COMMAND,
        onDelete,
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand(
        KEY_ESCAPE_COMMAND,
        onEscape,
        COMMAND_PRIORITY_LOW,
      ),
    );
  }, [editor, onClick, onDelete, onDragStart, onEscape]);

  return (
    <div className="relative inline-block">
      {!isLoaded && !isError && (
        <div className="absolute inset-0 flex items-center justify-center bg-base-200 rounded">
          <span className="loading loading-spinner loading-sm"></span>
        </div>
      )}
      {isError && (
        <div className="flex items-center justify-center bg-base-200 rounded p-8 text-base-content/50">
          <div className="text-center">
            <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-sm">Failed to load image</p>
          </div>
        </div>
      )}
      <div className={`relative inline-block ${isSelected ? 'ring-2 ring-primary ring-offset-2 rounded' : ''}`}>
        <img
          ref={imageRef}
          className={`${isError ? 'hidden' : ''} rounded ${isResizing ? 'pointer-events-none' : 'cursor-pointer'} transition-all block`}
          src={src}
          alt={altText}
          style={{
            width: width === 'inherit' ? 'auto' : `${width}px`,
            height: height === 'inherit' ? 'auto' : `${height}px`,
            maxWidth: `${maxWidth}px`,
          }}
          onLoad={() => setIsLoaded(true)}
          onError={() => setIsError(true)}
          draggable={!isResizing}
        />
        {isSelected && isLoaded && !isError && (
          <Suspense fallback={null}>
            <ImageResizer
              editor={editor}
              imageRef={imageRef}
              onResizeEnd={onResizeEnd}
              onResizeStart={onResizeStart}
            />
          </Suspense>
        )}
      </div>
    </div>
  );
}