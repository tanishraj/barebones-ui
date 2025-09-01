import React from 'react';
import { LexicalEditor } from 'lexical';
import { Quote } from 'lucide-react';

import { ToolbarButton } from '../ToolbarButton';
import { EditorState } from '../../../types';
import { formatQuote } from '../utils';

interface QuoteSectionProps {
  editor: LexicalEditor;
  editorState: EditorState;
}

export const QuoteSection: React.FC<QuoteSectionProps> = ({
  editor,
  editorState,
}) => {
  return (
    <div className='flex gap-1'>
      <ToolbarButton
        active={editorState.blockType === 'quote'}
        onClick={() => formatQuote(editor, editorState.blockType)}
        icon={<Quote className='h-4 w-4' />}
        label='Quote'
      />
    </div>
  );
};