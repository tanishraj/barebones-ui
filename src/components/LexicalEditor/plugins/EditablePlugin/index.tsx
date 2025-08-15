import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { FC, useEffect } from 'react';

export interface EditablePluginProps {
  isEditable: boolean;
}

export const EditablePlugin: FC<EditablePluginProps> = ({ isEditable }) => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    editor.setEditable(isEditable);
  }, [editor, isEditable]);

  return null;
};
