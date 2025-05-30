import {
  InitialConfigType,
  LexicalComposer,
} from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { HeadingNode } from '@lexical/rich-text';
import { CodeHighlightNode, CodeNode } from '@lexical/code';

import {
  ContentEditableStyles,
  EditorContainerStyles,
  EditorWrapperStyles,
  PlaceholderStyles,
} from './RichEditor.styles';
import { ToolbarPlugin } from './plugins';
import { theme } from './theme';

const INITIAL_CONFIG: InitialConfigType = {
  namespace: 'RichEditor',
  theme,
  nodes: [HeadingNode, CodeHighlightNode, CodeNode],
  onError: error => {
    console.error('Lexical error:', error);
  },
};

export const RichEditor = () => {
  const EditorWrapperClassName = EditorWrapperStyles();
  const EditorContainerClassName = EditorContainerStyles();
  const ContentEditableClassName = ContentEditableStyles();
  const PlaceholderClassName = PlaceholderStyles();

  return (
    <LexicalComposer initialConfig={INITIAL_CONFIG}>
      <div className={EditorWrapperClassName}>
        <ToolbarPlugin />
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
        <HistoryPlugin />
        <AutoFocusPlugin />
      </div>
    </LexicalComposer>
  );
};
