import React from 'react';
import { LexicalEditor, FORMAT_TEXT_COMMAND } from 'lexical';
import { Bold, Italic, Underline, Strikethrough, Code } from 'lucide-react';

import { ToolbarButton } from '../ToolbarButton';
import { EditorState } from '../../../types';

interface FormatSectionProps {
  editor: LexicalEditor;
  editorState: EditorState;
}

export const FormatSection: React.FC<FormatSectionProps> = ({
  editor,
  editorState,
}) => {
  return (
    <div className='flex gap-1'>
      <ToolbarButton
        active={editorState.isBold}
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')}
        icon={<Bold className='h-4 w-4' />}
        label='Bold (Ctrl+B)'
      />
      <ToolbarButton
        active={editorState.isItalic}
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')}
        icon={<Italic className='h-4 w-4' />}
        label='Italic (Ctrl+I)'
      />
      <ToolbarButton
        active={editorState.isUnderline}
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')}
        icon={<Underline className='h-4 w-4' />}
        label='Underline (Ctrl+U)'
      />
      <ToolbarButton
        active={editorState.isStrikethrough}
        onClick={() =>
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough')
        }
        icon={<Strikethrough className='h-4 w-4' />}
        label='Strikethrough'
      />
      <ToolbarButton
        active={editorState.isCode}
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'code')}
        icon={<Code className='h-4 w-4' />}
        label='Inline Code'
      />
    </div>
  );
};
