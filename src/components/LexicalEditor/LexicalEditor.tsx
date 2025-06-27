import { LexicalComposer } from '@lexical/react/LexicalComposer';

import { Editor } from './Editor';
import { EditorTheme } from './themes/EditorTheme';
import { EditorNodes } from './nodes/EditorNodes';
import { ToolbarContext } from './context';

import './styles/global.css';

const initialConfig = {
  namespace: 'MyEditor',
  onError: (error: Error) => {
    console.error('Lexical Editor Error:', error);
  },
  theme: EditorTheme,
  nodes: EditorNodes,
  editorState: null,
};

export const LexicalEditor = () => {
  return (
    <LexicalComposer initialConfig={initialConfig}>
      <ToolbarContext>
        <div className='editor-shell'>
          <Editor />
        </div>
      </ToolbarContext>
    </LexicalComposer>
  );
};
