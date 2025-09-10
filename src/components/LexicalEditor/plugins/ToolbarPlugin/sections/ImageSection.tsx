import React, { useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import { LexicalEditor } from 'lexical';
import { Image } from 'lucide-react';

import { ToolbarButton } from '../ToolbarButton';
import { INSERT_IMAGE_COMMAND, ImageUploadDialog } from '../../ImagePlugin';

interface ImageSectionProps {
  editor: LexicalEditor;
}

export const ImageSection: React.FC<ImageSectionProps> = ({ editor }) => {
  const [showDialog, setShowDialog] = useState(false);

  const handleInsertImage = useCallback(() => {
    setShowDialog(true);
  }, []);

  const handleSubmit = useCallback(
    (payload: any) => {
      // Ensure editor is focused before inserting image
      if (!editor.getRootElement()?.contains(document.activeElement)) {
        editor.focus();
      }
      
      editor.dispatchCommand(INSERT_IMAGE_COMMAND, payload);
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
        onClick={handleInsertImage}
        icon={<Image className='h-4 w-4' />}
        label='Insert Image'
        tooltip='Add image'
      />

      {showDialog &&
        createPortal(
          <ImageUploadDialog onSubmit={handleSubmit} onClose={handleClose} />,
          document.body,
        )}
    </>
  );
};