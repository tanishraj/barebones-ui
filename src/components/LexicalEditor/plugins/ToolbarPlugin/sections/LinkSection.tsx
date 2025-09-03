import React, { useCallback, useState } from 'react';
import { LexicalEditor } from 'lexical';
import { TOGGLE_LINK_COMMAND } from '@lexical/link';
import { Link } from 'lucide-react';

import { ToolbarButton } from '../ToolbarButton';
import { EditorState } from '../../../types';
import { SHORTCUTS } from '../../../config/shortcuts';
import { sanitizeUrl } from '../../../utils/url';

interface LinkSectionProps {
  editor: LexicalEditor;
  editorState: EditorState;
}

export const LinkSection: React.FC<LinkSectionProps> = ({
  editor,
  editorState,
}) => {
  const [isLinkEditMode, setIsLinkEditMode] = useState(false);
  
  const insertLink = useCallback(() => {
    if (!editorState.isLink) {
      // Insert new link
      setIsLinkEditMode(true);
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, sanitizeUrl('https://'));
    } else {
      // Remove existing link
      setIsLinkEditMode(false);
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
    }
  }, [editor, editorState.isLink]);

  return (
    <div className='flex gap-1'>
      <ToolbarButton
        active={editorState.isLink}
        onClick={insertLink}
        icon={<Link className='h-4 w-4' />}
        label={`Insert Link (${SHORTCUTS.INSERT_LINK})`}
        aria-label={`Insert link. Shortcut: ${SHORTCUTS.INSERT_LINK}`}
      />
    </div>
  );
};