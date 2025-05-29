import {
  InitialConfigType,
  LexicalComposer,
} from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';

import {
  ContentEditableStyles,
  EditorContainerStyles,
  PlaceholderStyles,
} from './RichEditor.styles';

const INITIAL_CONFIG: InitialConfigType = {
  namespace: 'RichEditor',
  theme: {},
  onError: error => {
    console.error('Lexical error:', error);
  },
};

export const RichEditor = () => {
  const ContentEditableClassName = ContentEditableStyles();
  const EditorContainerClassName = EditorContainerStyles();
  const PlaceholderClassName = PlaceholderStyles();

  return (
    <LexicalComposer initialConfig={INITIAL_CONFIG}>
      <div className={EditorContainerClassName}>
        <RichTextPlugin
          contentEditable={
            <ContentEditable
              className={ContentEditableClassName}
              aria-placeholder={'Enter some text...'}
              placeholder={
                <div className={PlaceholderClassName}>Enter some text...</div>
              }
            />
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
      </div>
    </LexicalComposer>
  );
};
