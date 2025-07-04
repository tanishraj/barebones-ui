import { useEffect } from 'react';
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

export type OnContentChangePluginProps = EditorProps;

const TRANSFORMERS = [...BASE_TRANSFORMERS, SOURCE_TRANSFORMER];

export const ContentPlugin: React.FC<OnContentChangePluginProps> = ({
  value,
  onChange,
}) => {
  const [editor] = useLexicalComposerContext();

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
    });
  };

  return <OnChangePlugin onChange={handleOnChange} ignoreSelectionChange />;
};
