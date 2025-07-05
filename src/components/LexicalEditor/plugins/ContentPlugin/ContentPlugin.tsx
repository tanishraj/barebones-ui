import { useEffect, useRef } from 'react';
import { EditorState } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import {
  $convertFromMarkdownString,
  $convertToMarkdownString,
  TRANSFORMERS as BASE_TRANSFORMERS,
} from '@lexical/markdown';

import { EditorProps } from '../../Editor';
import { SOURCE_TRANSFORMER } from '../../transformers';
import { PLAYGROUND_TRANSFORMERS } from '../MarkdownTransformers';

export type OnContentChangePluginProps = EditorProps;

const TRANSFORMERS = [
  ...BASE_TRANSFORMERS,
  ...PLAYGROUND_TRANSFORMERS,
  SOURCE_TRANSFORMER,
];

export const ContentPlugin: React.FC<OnContentChangePluginProps> = ({
  value,
  onChange,
  onDirtyChange,
}) => {
  const [editor] = useLexicalComposerContext();
  const isDirtyRef = useRef(false);

  useEffect(() => {
    if (value) {
      editor.update(() => {
        const currentMarkdown = $convertToMarkdownString(TRANSFORMERS);
        if (currentMarkdown === value) {
          return;
        }
        return $convertFromMarkdownString(value, TRANSFORMERS);
      });
    }
  }, [value, editor, onChange]);

  const handleOnChange = (editorState: EditorState) => {
    editorState.read(() => {
      const markdown = $convertToMarkdownString(TRANSFORMERS);
      onChange?.(markdown);

      // If onDirtyChange is provided, check for changes
      if (onDirtyChange) {
        const isDirty = markdown !== value;
        // Only call the handler if the dirty state changes
        if (isDirty !== isDirtyRef.current) {
          isDirtyRef.current = isDirty;
          onDirtyChange(isDirty);
        }
      }
    });
  };

  return <OnChangePlugin onChange={handleOnChange} ignoreSelectionChange />;
};
