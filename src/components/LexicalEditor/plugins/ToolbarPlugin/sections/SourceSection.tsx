import React, { useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import { LexicalEditor } from 'lexical';
import { Sparkles } from 'lucide-react';

import { ToolbarButton } from '../ToolbarButton';
import { INSERT_SOURCE_COMMAND, SourceInputDialog } from '../../SourcePlugin';

interface SourceSectionProps {
  editor: LexicalEditor;
}

export const SourceSection: React.FC<SourceSectionProps> = ({ editor }) => {
  const [showDialog, setShowDialog] = useState(false);

  const handleInsertSource = useCallback(() => {
    setShowDialog(true);
  }, []);

  const handleSubmit = useCallback(
    (sources: string[]) => {
      // Ensure editor is focused before inserting sources
      if (!editor.getRootElement()?.contains(document.activeElement)) {
        editor.focus();
      }

      editor.dispatchCommand(INSERT_SOURCE_COMMAND, { sources });
      setShowDialog(false);
    },
    [editor],
  );

  const handleClose = useCallback(() => {
    setShowDialog(false);
  }, []);

  return (
    <>
      <ToolbarButton
        onClick={handleInsertSource}
        icon={<Sparkles className='h-4 w-4' />}
        label='Insert Source'
        tooltip='Add source citations'
      />

      {showDialog &&
        createPortal(
          <SourceInputDialog onSubmit={handleSubmit} onClose={handleClose} />,
          document.body,
        )}
    </>
  );
};
