import { FC } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';

import { Editor } from './Editor';
import { ToolbarContext } from './context/ToolbarContext';
import { EditorNodes } from './nodes';
import { EditorTheme } from './themes';
import { EditorProps } from './types';
import './LexicalEditor.css';

const INITIAL_CONFIG = {
  namespace: 'LexicalEditor',
  onError: (error: Error) => {
    console.error('Lexical Editor Error:', error);
  },
  theme: EditorTheme,
  nodes: EditorNodes,
  editorState: undefined,
};

export const LexicalEditor: FC<EditorProps> = props => {
  return (
    <LexicalComposer initialConfig={INITIAL_CONFIG}>
      <ToolbarContext>
        <Editor {...props} />
      </ToolbarContext>
    </LexicalComposer>
  );
};
