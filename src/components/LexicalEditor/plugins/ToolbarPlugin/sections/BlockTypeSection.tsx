import React, { useCallback } from 'react';
import { LexicalEditor } from 'lexical';
import { HeadingTagType } from '@lexical/rich-text';
import { ChevronDown } from 'lucide-react';

import { EditorState } from '../../../types';
import { formatParagraph, formatHeading } from '../utils';

interface BlockTypeSectionProps {
  editor: LexicalEditor;
  editorState: EditorState;
}

const blockTypeToBlockName: Record<string, string> = {
  paragraph: 'Normal',
  h1: 'Heading 1',
  h2: 'Heading 2',
  h3: 'Heading 3',
  h4: 'Heading 4',
  h5: 'Heading 5',
  h6: 'Heading 6',
  quote: 'Quote',
  bullet: 'Bullet List',
  number: 'Numbered List',
};

const blockTypes = [
  { value: 'paragraph', label: 'Normal' },
  { value: 'h1', label: 'Heading 1' },
  { value: 'h2', label: 'Heading 2' },
  { value: 'h3', label: 'Heading 3' },
  { value: 'h4', label: 'Heading 4' },
  { value: 'h5', label: 'Heading 5' },
  { value: 'h6', label: 'Heading 6' },
];

export const BlockTypeSection: React.FC<BlockTypeSectionProps> = ({
  editor,
  editorState,
}) => {
  const handleBlockTypeChange = useCallback(
    (blockType: string) => {
      // Focus the editor first if it's not focused
      if (!editor.getRootElement()?.contains(document.activeElement)) {
        editor.focus();
      }

      // Apply the formatting
      if (blockType === 'paragraph') {
        formatParagraph(editor);
      } else if (blockType.startsWith('h')) {
        formatHeading(editor, blockType as HeadingTagType);
      }
    },
    [editor],
  );

  // Only show heading types and paragraph in the dropdown
  const displayBlockType = ['paragraph', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(editorState.blockType)
    ? editorState.blockType
    : 'paragraph';
  const currentBlockName = blockTypeToBlockName[displayBlockType] || 'Normal';

  return (
    <div className='dropdown dropdown-bottom'>
      <label
        tabIndex={0}
        className='btn btn-sm btn-ghost gap-1 font-normal'
        aria-label='Block type selector'
      >
        <span className='min-w-[80px] text-base text-left'>
          {currentBlockName}
        </span>
        <ChevronDown className='h-3 w-3' />
      </label>
      <ul
        tabIndex={0}
        className='dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 border border-base-300'
      >
        {blockTypes.map(type => (
          <li key={type.value}>
            <button
              onClick={() => handleBlockTypeChange(type.value)}
              className={displayBlockType === type.value ? 'active' : ''}
            >
              {type.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
