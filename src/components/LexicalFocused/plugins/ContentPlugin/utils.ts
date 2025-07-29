/* eslint-disable @typescript-eslint/no-explicit-any */

import { SerializedEditorState } from 'lexical';

import { ChangeLogs, ChangeLogType } from '../../types';

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
      differences.push(`${path}: markdown changed from "${obj1}" to "${obj2}"`);
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
const extractTextContent = (editorStateJSON: SerializedEditorState): string => {
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
    'list',
    'listitem',
    'ul',
    'ol',
    'li', // Lists are formatting for text
  ];

  return formattingNodeTypes.some(type =>
    nodeType.toLowerCase().includes(type.toLowerCase()),
  );
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
    'quote',
    'blockquote',
    'horizontalrule',
    'hr',
    'embed',
    'iframe',
    'link', // Links add meaningful content
    // Note: lists removed from here as they're now considered formatting
  ];

  return contentNodeTypes.some(type =>
    nodeType.toLowerCase().includes(type.toLowerCase()),
  );
};

// Create a content signature that ignores order but includes formatting
const createContentSignature = (
  editorStateJSON: SerializedEditorState,
): string => {
  const contentPieces: string[] = [];

  const extractContent = (node: any, depth: number = 0): void => {
    // Extract text content WITH its formatting context
    if (node.text) {
      // Include parent node type/tag to distinguish h1 text from h3 text
      const formatContext = `format:${node.format || 0}`;
      contentPieces.push(`text:${node.text}:${formatContext}`);
    }

    // Extract content nodes (images, tables, etc.)
    if (node.type && isContentNode(node.type)) {
      // Create a signature for content nodes
      const signature = `${node.type}:${JSON.stringify(node)}`;
      contentPieces.push(signature);
    }

    // For formatting nodes, include their type/tag in the signature
    if (node.type && isFormattingNode(node.type)) {
      const nodeSignature = `node:${node.type}:${node.tag || ''}:${node.listType || ''}`;
      contentPieces.push(nodeSignature);
    }

    // Recursively process children
    if (node.children && Array.isArray(node.children)) {
      node.children.forEach((child: any) => extractContent(child, depth + 1));
    }
  };

  if (editorStateJSON?.root) {
    extractContent(editorStateJSON.root);
  }

  // Sort to make order-independent
  return contentPieces.sort().join('|');
};

// Check if a reorder has occurred
const isReorderChange = (
  initialState: SerializedEditorState,
  currentState: SerializedEditorState,
): boolean => {
  // Compare content signatures (order-independent)
  const initialSignature = createContentSignature(initialState);
  const currentSignature = createContentSignature(currentState);

  // If signatures match, content is the same (just reordered)
  if (initialSignature === currentSignature) {
    // But states are different (checked before calling this)
    return true;
  }

  return false;
};

// Check for formatting changes in nodes
const hasFormattingChanges = (initial: any, current: any): boolean => {
  let hasChanges = false;

  const checkNode = (node1: any, node2: any, path: string = ''): boolean => {
    // Check if both nodes exist
    if (!node1 || !node2) {
      return false;
    }

    // For text nodes, check format property
    if (
      node1.type === 'text' ||
      node2.type === 'text' ||
      node1.text !== undefined ||
      node2.text !== undefined
    ) {
      // Format property in Lexical uses bitwise flags:
      // 1 = bold, 2 = italic, 4 = underline, 8 = strikethrough, etc.
      if (node1?.format !== node2?.format) {
        if (process.env.NODE_ENV === 'development') {
          console.log(
            `Format change detected at ${path}: ${node1?.format} → ${node2?.format}`,
          );
        }
        hasChanges = true;
        return true;
      }
    }

    // Check style changes
    if (JSON.stringify(node1?.style) !== JSON.stringify(node2?.style)) {
      hasChanges = true;
      return true;
    }

    // Check tag changes (e.g., h1 to h2, p to ul)
    if (node1?.tag !== node2?.tag) {
      // Both undefined is not a change
      if (!(node1?.tag === undefined && node2?.tag === undefined)) {
        hasChanges = true;
        return true;
      }
    }

    // Check type changes for formatting nodes
    if (node1?.type !== node2?.type) {
      // Check if this is a formatting-related type change
      if (
        isFormattingNode(node1?.type || '') ||
        isFormattingNode(node2?.type || '')
      ) {
        hasChanges = true;
        return true;
      }
    }

    // Check list type changes (ordered vs unordered)
    if (node1?.listType !== node2?.listType) {
      hasChanges = true;
      return true;
    }

    // Check direction changes (for RTL/LTR text)
    if (node1?.direction !== node2?.direction) {
      hasChanges = true;
      return true;
    }

    // Check indent level changes
    if (node1?.indent !== node2?.indent) {
      hasChanges = true;
      return true;
    }

    // Check children recursively - IMPORTANT: Check all children
    if (node1?.children && node2?.children) {
      const maxLength = Math.max(node1.children.length, node2.children.length);

      for (let i = 0; i < maxLength; i++) {
        const child1 = node1.children[i];
        const child2 = node2.children[i];

        if (!child1 || !child2) {
          // One child exists but not the other - could be a structural change
          continue;
        }

        if (checkNode(child1, child2, `${path}.children[${i}]`)) {
          hasChanges = true;
          // Don't return early - check all children
        }
      }
    }

    return false;
  };

  checkNode(initial?.root, current?.root, 'root');
  return hasChanges;
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
      const match = diff.match(
        /\.type: markdown changed from "(.*?)" to "(.*?)"/,
      );
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
export const analyzeChanges = (
  initialState: SerializedEditorState,
  currentState: SerializedEditorState,
): ChangeLogs => {
  // Deep equality check first
  const statesAreEqual =
    JSON.stringify(initialState) === JSON.stringify(currentState);
  if (statesAreEqual) {
    return {
      type: 'NO_CHANGE',
      isDirty: false,
      details: {
        formatChanges: [],
        contentChanges: [],
      },
    };
  }

  // Check if this is just a reorder
  const isReorder = isReorderChange(initialState, currentState);

  if (isReorder) {
    return {
      type: 'FORMAT_CHANGE',
      isDirty: true,
      details: {
        formatChanges: ['Content blocks reordered'],
        contentChanges: [],
      },
    };
  }

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

  // Log differences for debugging
  if (process.env.NODE_ENV === 'development' && allDifferences.length > 0) {
    console.log('All differences found:', allDifferences);
  }

  // Check if structural changes include content elements
  const hasContentStructuralChanges =
    hasStructuralContentChanges(allDifferences);

  // Identify formatting changes (including type conversions)
  const formatChanges = allDifferences.filter(diff => {
    // Check for format property changes (THIS IS KEY for bold, italic, etc.)
    if (diff.includes('.format:')) {
      return true;
    }

    // Check for style changes
    if (diff.includes('.style:')) {
      return true;
    }

    // Check for specific formatting keywords in the diff path
    const formattingKeywords = [
      'bold',
      'italic',
      'underline',
      'strikethrough',
      'code',
      'subscript',
      'superscript',
      'highlight',
    ];
    if (
      formattingKeywords.some(keyword => diff.toLowerCase().includes(keyword))
    ) {
      return true;
    }

    // Check for tag changes (e.g., h1 to h2, p to ul)
    if (diff.includes('.tag:')) {
      const match = diff.match(
        /\.tag: markdown changed from "(.*?)" to "(.*?)"/,
      );
      if (match) {
        const [, oldTag, newTag] = match;
        // Check if both are formatting tags (including lists)
        const formattingTags = [
          'h1',
          'h2',
          'h3',
          'h4',
          'h5',
          'h6',
          'p',
          'ul',
          'ol',
          'li',
        ];
        return (
          formattingTags.includes(oldTag) && formattingTags.includes(newTag)
        );
      }
      return true;
    }

    // Check for formatting type changes (e.g., heading to paragraph, paragraph to list)
    if (diff.includes('.type:')) {
      const match = diff.match(
        /\.type: markdown changed from "(.*?)" to "(.*?)"/,
      );
      if (match) {
        const [, oldType, newType] = match;
        return isFormattingTypeChange(oldType, newType);
      }
    }

    // Check for list type changes
    if (diff.includes('listType:') || diff.includes('.listType')) {
      return true;
    }

    // Check for direction changes
    if (diff.includes('.direction:')) {
      return true;
    }

    // Check for indent changes
    if (diff.includes('.indent:')) {
      return true;
    }

    return false;
  });

  // Determine change type
  let changeType: ChangeLogType = 'NO_CHANGE';
  if (hasTextChange || hasContentStructuralChanges) {
    changeType = 'CONTENT_CHANGE';
  } else if (hasFormatting || formatChanges.length > 0) {
    changeType = 'FORMAT_CHANGE';
  }

  // If we still have NO_CHANGE but states are different, it must be a format change
  if (changeType === 'NO_CHANGE' && !statesAreEqual) {
    changeType = 'FORMAT_CHANGE';
    if (process.env.NODE_ENV === 'development') {
      console.log(
        'States differ but no specific change detected, marking as FORMAT_CHANGE',
      );
    }
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
    isDirty:
      hasTextChange ||
      hasFormatting ||
      hasContentStructuralChanges ||
      formatChanges.length > 0 ||
      !statesAreEqual,
    details: {
      formatChanges:
        formatChanges.length > 0
          ? formatChanges
          : hasFormatting
            ? ['Format property changed']
            : !statesAreEqual && changeType === 'FORMAT_CHANGE'
              ? ['Unspecified format change detected']
              : [],
      contentChanges: contentChanges,
    },
  };
};
