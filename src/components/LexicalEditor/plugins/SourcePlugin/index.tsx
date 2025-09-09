import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_EDITOR,
  createCommand,
  type LexicalCommand,
} from 'lexical';
import { useEffect, useCallback, useState, useRef } from 'react';
import { createPortal } from 'react-dom';

import {
  $createSourceNode,
  $isSourceNode,
  SourceNode,
} from '../../nodes/SourceNode';

export type InsertSourcePayload = {
  sources: string[];
};

export const INSERT_SOURCE_COMMAND: LexicalCommand<InsertSourcePayload> =
  createCommand('INSERT_SOURCE_COMMAND');

interface SourcePluginProps {
  sources?: Array<{
    id: string;
    title?: string;
    url?: string;
    author?: string;
    [key: string]: any;
  }>;
  tooltipId?: string;
}

export default function SourcePlugin({
  sources = [],
  tooltipId = 'source-tooltip',
}: SourcePluginProps): JSX.Element | null {
  const [editor] = useLexicalComposerContext();

  // Create a map for quick source lookup
  const sourceMap = useCallback(() => {
    const map: Record<string, any> = {};
    sources.forEach(source => {
      map[source.id] = source;
    });
    return map;
  }, [sources])();

  // Handle setting data attributes for React Tooltip
  const handleSourceElement = useCallback(
    (sourceId: string, element: HTMLElement | null) => {
      if (element && sourceMap[sourceId]) {
        // Set data attributes for React Tooltip
        element.setAttribute('data-tooltip-id', tooltipId);
        element.setAttribute('data-tooltip-content', sourceId);
        
        // If source has a URL, make it clickable
        const source = sourceMap[sourceId];
        if (source?.url) {
          element.style.cursor = 'pointer';
          element.onclick = () => window.open(source.url, '_blank');
        }
      }
    },
    [sourceMap, tooltipId],
  );

  useEffect(() => {
    if (!editor.hasNodes([SourceNode])) {
      throw new Error('SourcePlugin: SourceNode not registered on editor');
    }

    // Update editor config with source handler
    const config = editor._config as any;
    config.sourceConfig = {
      onSourceElement: handleSourceElement,
      sources: sourceMap,
    };

    const removeCommand = editor.registerCommand(
      INSERT_SOURCE_COMMAND,
      (payload: InsertSourcePayload) => {
        const { sources } = payload;
        const selection = $getSelection();

        if (!$isRangeSelection(selection)) {
          return false;
        }

        const sourceNode = $createSourceNode(sources);
        selection.insertNodes([sourceNode]);

        return true;
      },
      COMMAND_PRIORITY_EDITOR,
    );

    return () => {
      removeCommand();
    };
  }, [editor, handleSourceElement, sourceMap]);

  return null;
}

// Helper component for source input dialog
interface SourceInputDialogProps {
  onSubmit: (sources: string[]) => void;
  onClose: () => void;
  initialSources?: string[];
}

export const SourceInputDialog: React.FC<SourceInputDialogProps> = ({
  onSubmit,
  onClose,
  initialSources = [],
}) => {
  const [input, setInput] = useState(initialSources.join(', '));

  const handleSubmit = () => {
    const sources = input
      .split(',')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    if (sources.length > 0) {
      onSubmit(sources);
      onClose();
    }
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
      <div className='bg-base-100 rounded-lg shadow-xl p-6 w-96'>
        <h3 className='text-lg font-semibold mb-4'>Add Sources</h3>
        <div className='form-control mb-4'>
          <label className='label'>
            <span className='label-text'>
              Enter source numbers (comma-separated)
            </span>
          </label>
          <input
            type='text'
            className='input input-bordered'
            placeholder='1, 2, 3'
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                handleSubmit();
              }
            }}
            autoFocus
          />
          <label className='label'>
            <span className='label-text-alt'>Example: 1, 2, 3 or 1,2,3</span>
          </label>
        </div>
        <div className='flex justify-end gap-2'>
          <button className='btn btn-ghost' onClick={onClose}>
            Cancel
          </button>
          <button className='btn btn-primary' onClick={handleSubmit}>
            Add Sources
          </button>
        </div>
      </div>
    </div>
  );
};
