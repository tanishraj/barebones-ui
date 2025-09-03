import React, { useCallback } from 'react';
import { LexicalEditor } from 'lexical';
import { Quote } from 'lucide-react';

import { ToolbarButton } from '../ToolbarButton';
import { EditorState } from '../../../types';
import { formatQuote } from '../utils';
import { SHORTCUTS } from '../../../config/shortcuts';

interface QuoteSectionProps {
  editor: LexicalEditor;
  editorState: EditorState;
}

export const QuoteSection: React.FC<QuoteSectionProps> = ({
  editor,
  editorState,
}) => {
  const handleQuote = useCallback(() => {
    formatQuote(editor, editorState.blockType);
  }, [editor, editorState.blockType]);

  return (
    <div className='flex gap-1'>
      <ToolbarButton
        active={editorState.blockType === 'quote'}
        onClick={handleQuote}
        icon={<Quote className='h-4 w-4' />}
        label={`Quote (${SHORTCUTS.QUOTE})`}
        aria-label={`Format text as quote. Shortcut: ${SHORTCUTS.QUOTE}`}
      />
    </div>
  );
};