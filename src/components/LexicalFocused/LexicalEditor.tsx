import { FC } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';

import { Editor } from './Editor';
import { ToolbarContext } from './context/ToolbarContext';
import { SourceContext } from './context/SourceContext';
import { EditorNodes } from './nodes';
import { EditorTheme } from './themes';
import { EditorProps } from './types';
import './LexicalEditor.css';

import { DUMMY_SOURCES } from '@/playground/components/LexicalFocusedExample/mockData';
export type LexicalEditorProps = EditorProps;

const INITIAL_CONFIG = {
  namespace: 'LexicalEditor',
  onError: (error: Error) => {
    console.error('Lexical Editor Error:', error);
  },
  theme: EditorTheme,
  nodes: EditorNodes,
  editorState: undefined,
};

export const LexicalEditor: FC<LexicalEditorProps> = ({ ...restProps }) => {
  return (
    <LexicalComposer initialConfig={INITIAL_CONFIG}>
      <ToolbarContext>
        <SourceContext value={DUMMY_SOURCES}>
          <Editor {...restProps} />
        </SourceContext>
      </ToolbarContext>
    </LexicalComposer>
  );
};
