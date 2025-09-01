import React from 'react';
import { LexicalEditor, REDO_COMMAND, UNDO_COMMAND } from 'lexical';
import { Undo, Redo } from 'lucide-react';

import { ToolbarButton } from '../ToolbarButton';
import { EditorState } from '../../../types';

interface HistorySectionProps {
  editor: LexicalEditor;
  editorState: EditorState;
}

export const HistorySection: React.FC<HistorySectionProps> = ({
  editor,
  editorState,
}) => {
  return (
    <div className='flex gap-1'>
      <ToolbarButton
        disabled={!editorState.canUndo}
        onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
        icon={<Undo className='h-4 w-4' />}
        label='Undo (Ctrl+Z)'
      />
      <ToolbarButton
        disabled={!editorState.canRedo}
        onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
        icon={<Redo className='h-4 w-4' />}
        label='Redo (Ctrl+Y)'
      />
    </div>
  );
};
