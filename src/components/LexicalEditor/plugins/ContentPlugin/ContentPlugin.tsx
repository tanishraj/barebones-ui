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

// Check for formatting changes in nodes
const hasFormattingChanges = (initial: any, current: any): boolean => {
  const checkNode = (node1: any, node2: any): boolean => {
    // Check format property (includes bold, italic, etc. as bitwise flags)
    if (node1?.format !== node2?.format) {
      return true;
    }

    // Check style changes
    if (JSON.stringify(node1?.style) !== JSON.stringify(node2?.style)) {
      return true;
    }

    // Check children recursively
    if (node1?.children && node2?.children) {
      if (node1.children.length !== node2.children.length) {
        return true;
      }

      for (let i = 0; i < node1.children.length; i++) {
        if (checkNode(node1.children[i], node2.children[i])) {
          return true;
        }
      }
    }

    return false;
  };

  return checkNode(initial?.root, current?.root);
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

// Check if a node type represents content (not just formatting)
const isContentNode = (nodeType: string): boolean => {
  const contentNodeTypes = [
    'table',
    'tablerow',
    'tablecell',
    'equation',
    'formula',
    'math',
    'image',
    'video',
    'audio',
    'code',
    'codeblock',
    'list',
    'listitem',
    'quote',
    'blockquote',
    'horizontalrule',
    'hr',
    'embed',
    'iframe',
    'link', // Links add meaningful content
  ];

  return contentNodeTypes.some(type =>
    nodeType.toLowerCase().includes(type.toLowerCase()),
  );
};

// Check if a node type represents formatting (text style variations)
const isFormattingNode = (nodeType: string): boolean => {
  const formattingNodeTypes = [
    'heading',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'paragraph',
    'p',
    'text',
  ];

  return formattingNodeTypes.some(type =>
    nodeType.toLowerCase().includes(type.toLowerCase()),
  );
};

// Check if a type change is a formatting change
const isFormattingTypeChange = (oldType: string, newType: string): boolean => {
  // Converting between heading levels or paragraph types is a format change
  return isFormattingNode(oldType) && isFormattingNode(newType);
};

// Check if changes include structural content changes
const hasStructuralContentChanges = (differences: string[]): boolean => {
  return differences.some(diff => {
    // Check for node type changes
    if (diff.includes('.type:')) {
      const match = diff.match(/\.type: value changed from "(.*?)" to "(.*?)"/);
      if (match) {
        const [, oldType, newType] = match;
        // If it's a formatting type change (e.g., h1 to h3), it's NOT a content change
        if (isFormattingTypeChange(oldType, newType)) {
          return false;
        }
        // If either type is a content node, it's a content change
        return isContentNode(oldType) || isContentNode(newType);
      }
    }

    // Check for added/removed nodes that represent content
    if (diff.includes(': added') || diff.includes(': removed')) {
      // Check if the path indicates a content node
      const pathParts = diff.split('.');
      return pathParts.some(part => isContentNode(part));
    }

    return false;
  });
};

// Analyze changes between two editor states
const analyzeChanges = (
  initialState: any,
  currentState: any,
): ChangeDetection => {
  // Extract text content
  const initialText = extractTextContent(initialState);
  const currentText = extractTextContent(currentState);

  // Check for text content changes
  const hasTextChange = initialText !== currentText;

  // Check for formatting changes (bold, italic, etc.)
  const hasFormatting = hasFormattingChanges(initialState, currentState);

  // Deep comparison for all changes
  const fullComparison = deepCompare(initialState, currentState);
  const allDifferences = fullComparison.differences;

  // Check if structural changes include content elements
  const hasContentStructuralChanges =
    hasStructuralContentChanges(allDifferences);

  // Identify formatting changes (including type conversions)
  const formatChanges = allDifferences.filter(diff => {
    // Check for format property changes
    if (
      diff.includes('.format:') ||
      diff.includes('.style:') ||
      diff.includes('bold') ||
      diff.includes('italic') ||
      diff.includes('underline') ||
      diff.includes('strikethrough') ||
      diff.includes('code') ||
      diff.includes('subscript') ||
      diff.includes('superscript')
    ) {
      return true;
    }

    // Check for tag changes (e.g., h1 to h2)
    if (diff.includes('.tag:')) {
      const match = diff.match(/\.tag: value changed from "(.*?)" to "(.*?)"/);
      if (match) {
        const [, oldTag, newTag] = match;
        // Check if both are heading tags or formatting tags
        const formattingTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p'];
        return (
          formattingTags.includes(oldTag) && formattingTags.includes(newTag)
        );
      }
      return true;
    }

    // Check for formatting type changes (e.g., heading to paragraph)
    if (diff.includes('.type:')) {
      const match = diff.match(/\.type: value changed from "(.*?)" to "(.*?)"/);
      if (match) {
        const [, oldType, newType] = match;
        return isFormattingTypeChange(oldType, newType);
      }
    }

    return false;
  });

  // Determine change type
  let changeType: ChangeType = 'NO_CHANGE';
  if (hasTextChange || hasContentStructuralChanges) {
    changeType = 'CONTENT_CHANGE';
  } else if (hasFormatting || formatChanges.length > 0) {
    changeType = 'FORMAT_CHANGE';
  }

  // Prepare detailed change information
  const contentChanges = [];
  if (hasTextChange) {
    contentChanges.push(
      `Text changed from "${initialText}" to "${currentText}"`,
    );
  }
  if (hasContentStructuralChanges) {
    const contentStructuralDiffs = allDifferences.filter(diff =>
      hasStructuralContentChanges([diff]),
    );
    contentChanges.push(...contentStructuralDiffs);
  }

  return {
    type: changeType,
    isContentUpdated:
      hasTextChange ||
      hasFormatting ||
      hasContentStructuralChanges ||
      formatChanges.length > 0,
    details: {
      formatChanges:
        formatChanges.length > 0
          ? formatChanges
          : hasFormatting
            ? ['Format property changed']
            : [],
      contentChanges: contentChanges,
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

        // Enhanced debugging
        if (process.env.NODE_ENV === 'development') {
          console.log('Editor state change analysis:', {
            type: changeDetection.type,
            isContentUpdated: changeDetection.isContentUpdated,
            details: changeDetection.details,
            initialState: initialStateRef.current,
            currentState: currentStateRef.current,
          });
        }
      }

      // Convert to markdown and call onChange
      const markdown = $convertToMarkdownString(EDITOR_TRANSFORMERS);
      onChange?.(markdown);
    });
  };

  return <OnChangePlugin onChange={handleOnChange} ignoreSelectionChange />;
};
