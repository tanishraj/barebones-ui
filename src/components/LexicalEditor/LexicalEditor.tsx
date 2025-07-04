import { LexicalComposer } from '@lexical/react/LexicalComposer';

import { Editor, EditorProps } from './Editor';
import { EditorTheme } from './themes/EditorTheme';
import { EditorNodes } from './nodes/EditorNodes';
import { ToolbarContext } from './context';
import { SourceContext } from './context/SourceContext';

import './styles/global.css';

export type LexicalEditorProps = EditorProps;

const SOURCES_LIST = [
  {
    id: '1',
    name: 'Source 1',
    content: 'Source 1',
  },
  {
    id: '2',
    name: 'Source 2',
    content: 'Source 2',
  },
  {
    id: '3',
    name: 'Source 3',
    content: 'Source 3',
  },
];

const initialConfig = {
  namespace: 'MyEditor',
  onError: (error: Error) => {
    console.error('Lexical Editor Error:', error);
  },
  theme: EditorTheme,
  nodes: EditorNodes,
  editorState: null,
};

export const LexicalEditor: React.FC<LexicalEditorProps> = ({
  value,
  onChange,
}) => {
  return (
    <LexicalComposer initialConfig={initialConfig}>
      <ToolbarContext>
        <SourceContext value={SOURCES_LIST}>
          <div className='editor-shell'>
            <Editor value={value} onChange={onChange} />
          </div>
        </SourceContext>
      </ToolbarContext>
    </LexicalComposer>
  );
};
