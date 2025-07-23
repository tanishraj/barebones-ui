import { FC } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';

import { ContentEditableUi } from './components/ContentEditableUi';
import { EditorProps } from './types';
import './Editor.css';

import { cn } from '@/utils';

const DEFAULT_PLACEHOLDER = 'Type something...';

const INITIAL_CONFIG = {
  namespace: 'LexicalEditor',
  onError: (error: Error) => {
    console.error('Lexical Editor Error:', error);
  },
  editorState: null,
};

export const Editor: FC<EditorProps> = ({
  placeholder,
  editorShellClassName,
}) => {
  return (
    <LexicalComposer initialConfig={INITIAL_CONFIG}>
      <div className={cn('editor-shell', editorShellClassName)}>
        <RichTextPlugin
          contentEditable={
            <div className='editor-scroller'>
              <div className='editor'>
                <ContentEditableUi
                  className='content-editable'
                  placeholder={placeholder || DEFAULT_PLACEHOLDER}
                  placeholderClassName='content-editable-placeholder'
                />
              </div>
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
      </div>
    </LexicalComposer>
  );
};
