import React from 'react';
import { LexicalEditor } from 'lexical';
import { List, ListOrdered } from 'lucide-react';

import { ToolbarButton } from '../ToolbarButton';
import { EditorState } from '../../../types';
import {
  formatBulletList,
  formatNumberedList,
} from '../utils';

interface ListSectionProps {
  editor: LexicalEditor;
  editorState: EditorState;
}

export const ListSection: React.FC<ListSectionProps> = ({
  editor,
  editorState,
}) => {
  return (
    <div className='flex gap-1'>
      <ToolbarButton
        active={editorState.blockType === 'bullet'}
        onClick={() => formatBulletList(editor, editorState.blockType)}
        icon={<List className='h-4 w-4' />}
        label='Bullet List'
      />
      <ToolbarButton
        active={editorState.blockType === 'number'}
        onClick={() => formatNumberedList(editor, editorState.blockType)}
        icon={<ListOrdered className='h-4 w-4' />}
        label='Numbered List'
      />
    </div>
  );
};