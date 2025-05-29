import {
  InitialConfigType,
  LexicalComposer,
} from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';

import { ContentEditableStyles } from './RichEditor.styles';

const INITIAL_CONFIG: InitialConfigType = {
  namespace: 'RichEditor',
  theme: {},
  onError: error => {
    console.error('Lexical error:', error);
  },
};

export const RichEditor = () => {
  const ContentEditableClassName = ContentEditableStyles();

  return (
    <LexicalComposer initialConfig={INITIAL_CONFIG}>
      <RichTextPlugin
        contentEditable={
          <ContentEditable
            className={ContentEditableClassName}
            aria-placeholder={'Enter some text...'}
            placeholder={<div>Enter some text...</div>}
          />
        }
        ErrorBoundary={LexicalErrorBoundary}
      />
    </LexicalComposer>
  );
};
