import React, { useCallback } from 'react';
import { LexicalEditor } from 'lexical';
import { Link } from 'lucide-react';

import { ToolbarButton } from '../ToolbarButton';
import { EditorState } from '../../../types';
import { OPEN_LINK_EDITOR_COMMAND } from '../../../commands/linkCommands';

interface LinkSectionProps {
  editor: LexicalEditor;
  editorState: EditorState;
}

export const LinkSection: React.FC<LinkSectionProps> = ({
  editor,
  editorState,
}) => {
  const toggleLink = useCallback(() => {
    if (!editorState.isLink) {
      // Open link editor in create mode for new links
      editor.dispatchCommand(OPEN_LINK_EDITOR_COMMAND, { mode: 'create' });
    } else {
      // Open link editor in edit mode for existing links
      editor.dispatchCommand(OPEN_LINK_EDITOR_COMMAND, { mode: 'edit' });
    }
  }, [editor, editorState.isLink]);

  return (
    <div className='flex gap-1'>
      <ToolbarButton
        active={editorState.isLink}
        onClick={toggleLink}
        icon={<Link className='h-4 w-4' />}
        label={editorState.isLink ? 'Remove Link' : 'Insert Link'}
      />
    </div>
  );
};
