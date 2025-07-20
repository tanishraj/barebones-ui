import { useEffect, useRef, useState } from 'react';
import { $getRoot, EditorState } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import {
  $convertFromMarkdownString,
  $convertToMarkdownString,
} from '@lexical/markdown';
import { useLexicalCommandsLog } from '@lexical/devtools-core';

import { EditorProps } from '../../Editor';
import { EDITOR_TRANSFORMERS } from '../../transformers';

export type ChangeType = 'FORMAT_CHANGE' | 'CONTENT_CHANGE' | 'NO_CHANGE';

export interface ChangeDetection {
  type: ChangeType;
  isContentUpdated: boolean;
  details?: {
    formatChanges?: string[];
    contentChanges?: string[];
  };
}

export type OnContentChangePluginProps = EditorProps & {
  onChangeDetected?: (change: ChangeDetection) => void;
};

// Deep comparison utility for nested objects
const deepCompare = (
  obj1: any,
  obj2: any,
  path: string = '',
): { isEqual: boolean; differences: string[] } => {
  const differences: string[] = [];

  if (obj1 === obj2) {
    return { isEqual: true, differences };
  }

  if (typeof obj1 !== typeof obj2) {
    differences.push(`${path}: type mismatch`);
    return { isEqual: false, differences };
  }

  if (typeof obj1 !== 'object' || obj1 === null || obj2 === null) {
    if (obj1 !== obj2) {
      differences.push(`${path}: value changed from "${obj1}" to "${obj2}"`);
    }
    return { isEqual: obj1 === obj2, differences };
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const allKeys = new Set([...keys1, ...keys2]);

  for (const key of allKeys) {
    const newPath = path ? `${path}.${key}` : key;

    if (!(key in obj1)) {
      differences.push(`${newPath}: added`);
    } else if (!(key in obj2)) {
      differences.push(`${newPath}: removed`);
    } else {
      const result = deepCompare(obj1[key], obj2[key], newPath);
      differences.push(...result.differences);
    }
  }

  return { isEqual: differences.length === 0, differences };
};

// Extract plain text content from editor state JSON
const extractTextContent = (editorStateJSON: any): string => {
  let textContent = '';

  const extractFromNode = (node: any): void => {
    if (node.text) {
      textContent += node.text;
    }

    if (node.children && Array.isArray(node.children)) {
      node.children.forEach(extractFromNode);
    }
  };

  if (editorStateJSON?.root) {
    extractFromNode(editorStateJSON.root);
  }

  return textContent;
};

// Remove text content from nodes to isolate formatting
const removeTextContent = (obj: any): any => {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(removeTextContent);
  }

  const result: any = {};
  for (const key in obj) {
    if (key === 'text') {
      // Keep the key but set it to empty to maintain structure
      result[key] = '';
    } else {
      result[key] = removeTextContent(obj[key]);
    }
  }

  return result;
};

// Analyze changes between two editor states
const analyzeChanges = (
  initialState: any,
  currentState: any,
): ChangeDetection => {
  // Extract text content
  const initialText = extractTextContent(initialState);
  const currentText = extractTextContent(currentState);

  // Check for content changes
  const hasContentChange = initialText !== currentText;

  // Create formatting-only versions (structure without text)
  const initialFormatting = removeTextContent(initialState);
  const currentFormatting = removeTextContent(currentState);

  // Compare formatting
  const formatComparison = deepCompare(initialFormatting, currentFormatting);
  const hasFormatChange = !formatComparison.isEqual;

  // Filter out text-related differences for format analysis
  const formatDifferences = formatComparison.differences.filter(
    diff => !diff.includes('.text:'),
  );

  // Determine change type
  let changeType: ChangeType = 'NO_CHANGE';
  if (hasContentChange && hasFormatChange) {
    changeType = 'CONTENT_CHANGE'; // Content change takes precedence
  } else if (hasContentChange) {
    changeType = 'CONTENT_CHANGE';
  } else if (hasFormatChange) {
    changeType = 'FORMAT_CHANGE';
  }

  return {
    type: changeType,
    isContentUpdated: hasContentChange || hasFormatChange,
    details: {
      formatChanges: formatDifferences,
      contentChanges: hasContentChange
        ? [`Text changed from "${initialText}" to "${currentText}"`]
        : [],
    },
  };
};

export const ContentPlugin: React.FC<OnContentChangePluginProps> = ({
  value,
  onChange,
  onContentUpdate,
  onChangeDetected,
}) => {
  const [editor] = useLexicalComposerContext();
  const commandsLog = useLexicalCommandsLog(editor);
  const initialStateRef = useRef<any>(null);
  const currentStateRef = useRef<any>(null);
  const isInitializedRef = useRef(false);

  useEffect(() => {
    if (value && !isInitializedRef.current) {
      const unregister = editor.registerUpdateListener(({ editorState }) => {
        if (isInitializedRef.current) {
          return;
        }

        // Initialize the initial state when the editor is ready
        editorState.read(() => {
          const editorStateJSON = editorState.toJSON();
          initialStateRef.current = editorStateJSON;
          currentStateRef.current = editorStateJSON;
          isInitializedRef.current = true;
        });

        // Unregister after initialization
        unregister();
      });

      return () => {
        unregister();
      };
    }
  }, [value, editor]);

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
  }, [value, editor]);

  const handleOnChange = (editorState: EditorState) => {
    editorState.read(() => {
      const editorStateJSON = editorState.toJSON();
      currentStateRef.current = editorStateJSON;

      // Analyze changes if we have an initial state
      if (initialStateRef.current && currentStateRef.current) {
        const changeDetection = analyzeChanges(
          initialStateRef.current,
          currentStateRef.current,
        );

        // Call the legacy callback
        onContentUpdate?.(changeDetection.isContentUpdated);

        // Call the new change detection callback
        onChangeDetected?.(changeDetection);

        // Log changes for debugging
        if (process.env.NODE_ENV === 'development') {
          if (changeDetection.type !== 'NO_CHANGE') {
            console.log('Change detected:', {
              type: changeDetection.type,
              details: changeDetection.details,
            });
          }
        }
      }

      // Convert to markdown and call onChange
      const markdown = $convertToMarkdownString(EDITOR_TRANSFORMERS);
      onChange?.(markdown);
    });
  };

  return <OnChangePlugin onChange={handleOnChange} ignoreSelectionChange />;
};
