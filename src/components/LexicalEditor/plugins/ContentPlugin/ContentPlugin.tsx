import { useEffect } from 'react';
import { EditorState } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import {
  $convertFromMarkdownString,
  $convertToMarkdownString,
} from '@lexical/markdown';
import { useLexicalCommandsLog } from '@lexical/devtools-core';

import { EditorProps } from '../../Editor';
import { EDITOR_TRANSFORMERS } from '../../transformers';

export type OnContentChangePluginProps = EditorProps;

export const ContentPlugin: React.FC<OnContentChangePluginProps> = ({
  value,
  onChange,
}) => {
  const [editor] = useLexicalComposerContext();
  const commandsLog = useLexicalCommandsLog(editor);

  console.log({ commandsLog });

  useEffect(() => {
    if (value) {
      editor.update(() => {
        const currentMarkdown = $convertToMarkdownString(EDITOR_TRANSFORMERS);
        if (currentMarkdown === value) {
          return;
        }
        return $convertFromMarkdownString(value, EDITOR_TRANSFORMERS);
      });
    }
  }, [value, editor, onChange]);

  const handleOnChange = (editorState: EditorState) => {
    editorState.read(() => {
      const markdown = $convertToMarkdownString(EDITOR_TRANSFORMERS);
      onChange?.(markdown);
    });
  };

  return <OnChangePlugin onChange={handleOnChange} ignoreSelectionChange />;
};
