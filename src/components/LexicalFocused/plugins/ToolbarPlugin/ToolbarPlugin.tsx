import { Dispatch, FC, SetStateAction } from 'react';
import { LexicalEditor } from 'lexical';

import './ToolbarPlugin.css';

interface ToolbarPluginProps {
  editor: LexicalEditor;
  activeEditor: LexicalEditor;
  setActiveEditor: Dispatch<SetStateAction<LexicalEditor>>;
  setIsLinkEditMode: Dispatch<boolean>;
  isEditable: boolean;
}

export const ToolbarPlugin: FC<ToolbarPluginProps> = () => {
  return <div className='toolbar'>Toolbar plugin</div>;
};
