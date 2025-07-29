import { useEffect, useRef } from 'react';
import { EditorState, SerializedEditorState } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import {
  $convertFromMarkdownString,
  $convertToMarkdownString,
} from '@lexical/markdown';

import { EDITOR_TRANSFORMERS } from '../../transformers/EditorTransformers';
import { ChangeLogs, ChangeLogType } from '../../types';
import { analyzeChanges } from './utils';

export type ContentChangePluginProps = {
  markdown?: string;
  onChange?: (markdown: string) => void;
  onChangeLogs?: (logs: ChangeLogs) => void;
};

export const ContentPlugin: React.FC<ContentChangePluginProps> = ({
  markdown,
  onChange,
  onChangeLogs,
}) => {
  const [editor] = useLexicalComposerContext();
  const initialStateRef = useRef<SerializedEditorState | null>(null);
  const currentStateRef = useRef<SerializedEditorState | null>(null);
  const isInitializedRef = useRef(false);
  const lastReportedChangeRef = useRef<ChangeLogType>('NO_CHANGE');

  useEffect(() => {
    if (markdown) {
      editor.update(
        () => {
          const currentMarkdown = $convertToMarkdownString(EDITOR_TRANSFORMERS);
          if (currentMarkdown === markdown) {
            return;
          }

          $convertFromMarkdownString(markdown, EDITOR_TRANSFORMERS);
        },
        {
          onUpdate: () => {
            // Capture initial state after markdown is converted
            if (!isInitializedRef.current) {
              editor.getEditorState().read(() => {
                const editorStateJSON = editor.getEditorState().toJSON();
                initialStateRef.current = editorStateJSON;
                currentStateRef.current = editorStateJSON;
                isInitializedRef.current = true;

                if (process.env.NODE_ENV === 'development') {
                  console.log('Initial state captured:', editorStateJSON);
                }
              });
            }
          },
        },
      );
    }
  }, [markdown, editor]);

  const handleOnChange = (editorState: EditorState) => {
    editorState.read(() => {
      const editorStateJSON = editorState.toJSON();

      // Skip if we haven't initialized yet
      if (!isInitializedRef.current || !initialStateRef.current) {
        // Try to initialize now if we have content
        if (
          !isInitializedRef.current &&
          editorStateJSON?.root?.children?.length > 0
        ) {
          initialStateRef.current = editorStateJSON;
          currentStateRef.current = editorStateJSON;
          isInitializedRef.current = true;

          if (process.env.NODE_ENV === 'development') {
            console.log('Late initialization of state:', editorStateJSON);
          }
        }
        return;
      }

      // Store previous state for comparison
      const previousState = currentStateRef.current;

      // Update current state
      currentStateRef.current = editorStateJSON;

      // Compare against initial state for the overall change detection
      const ChangeLogs = analyzeChanges(
        initialStateRef.current,
        currentStateRef.current,
      );

      // Also check if there was any change from the previous state
      const hasAnyChange =
        JSON.stringify(previousState) !==
        JSON.stringify(currentStateRef.current);

      // Report changes
      if (
        hasAnyChange ||
        ChangeLogs.type !== 'NO_CHANGE' ||
        lastReportedChangeRef.current !== 'NO_CHANGE'
      ) {
        lastReportedChangeRef.current = ChangeLogs.type;

        // Call the new change detection callback
        onChangeLogs?.(ChangeLogs);
      }

      // Enhanced debugging
      if (process.env.NODE_ENV === 'development' && hasAnyChange) {
        console.log('Editor state change analysis:', {
          type: ChangeLogs.type,
          isDirty: ChangeLogs.isDirty,
          details: ChangeLogs.details,
          hasAnyChange,
          formatChangesFound: ChangeLogs.details?.formatChanges?.length || 0,
        });
      }

      // Convert to markdown and call onChange
      const markdown = $convertToMarkdownString(EDITOR_TRANSFORMERS);
      onChange?.(markdown);
    });
  };

  return <OnChangePlugin onChange={handleOnChange} ignoreSelectionChange />;
};
