import { LexicalComposer } from '@lexical/react/LexicalComposer';

import { Button } from '../Button';
import { Editor } from './Editor';
import { ToolbarContext } from './context/ToolbarContext';
import './LexicalEditor.css';

const INITIAL_CONFIG = {
  namespace: 'LexicalEditor',
  onError: (error: Error) => {
    console.error('Lexical Editor Error:', error);
  },
  editorState: null,
};

export const LexicalEditor = () => {
  return (
    <div>
      <LexicalComposer initialConfig={INITIAL_CONFIG}>
        <ToolbarContext>
          <Editor />
        </ToolbarContext>
      </LexicalComposer>
      <div className='flex justify-end items-center gap-2 mt-4'>
        <Button variant='primary'>Save</Button>
        <Button variant='secondary'>Cancel</Button>
      </div>
    </div>
  );
};
