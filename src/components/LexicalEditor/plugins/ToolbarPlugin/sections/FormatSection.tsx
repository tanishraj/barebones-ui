import React, { useCallback } from 'react';
import { LexicalEditor, FORMAT_TEXT_COMMAND } from 'lexical';
import { Bold, Italic, Underline, Strikethrough, Code } from 'lucide-react';

import { ToolbarButton } from '../ToolbarButton';
import { EditorState } from '../../../types';
import { SHORTCUTS } from '../../../config/shortcuts';

interface FormatSectionProps {
  editor: LexicalEditor;
  editorState: EditorState;
}

export const FormatSection: React.FC<FormatSectionProps> = ({
  editor,
  editorState,
}) => {
  const formatText = useCallback(
    (format: string) => {
      editor.dispatchCommand(FORMAT_TEXT_COMMAND, format);
    },
    [editor],
  );

  return (
    <div className='flex gap-1'>
      <ToolbarButton
        active={editorState.isBold}
        onClick={() => formatText('bold')}
        icon={<Bold className='h-4 w-4' />}
        label={`Bold (${SHORTCUTS.BOLD})`}
        aria-label={`Format text as bold. Shortcut: ${SHORTCUTS.BOLD}`}
      />
      <ToolbarButton
        active={editorState.isItalic}
        onClick={() => formatText('italic')}
        icon={<Italic className='h-4 w-4' />}
        label={`Italic (${SHORTCUTS.ITALIC})`}
        aria-label={`Format text as italics. Shortcut: ${SHORTCUTS.ITALIC}`}
      />
      <ToolbarButton
        active={editorState.isUnderline}
        onClick={() => formatText('underline')}
        icon={<Underline className='h-4 w-4' />}
        label={`Underline (${SHORTCUTS.UNDERLINE})`}
        aria-label={`Format text to underlined. Shortcut: ${SHORTCUTS.UNDERLINE}`}
      />
      <ToolbarButton
        active={editorState.isStrikethrough}
        onClick={() => formatText('strikethrough')}
        icon={<Strikethrough className='h-4 w-4' />}
        label={`Strikethrough (${SHORTCUTS.STRIKETHROUGH})`}
        aria-label={`Format text with a strikethrough. Shortcut: ${SHORTCUTS.STRIKETHROUGH}`}
      />
      <ToolbarButton
        active={editorState.isCode}
        onClick={() => formatText('code')}
        icon={<Code className='h-4 w-4' />}
        label={`Inline Code (${SHORTCUTS.CODE})`}
        aria-label={`Format text as inline code. Shortcut: ${SHORTCUTS.CODE}`}
      />
    </div>
  );
};