import { useCallback, useEffect, useState } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  COMMAND_PRIORITY_CRITICAL,
  SELECTION_CHANGE_COMMAND,
  $isRootOrShadowRoot,
} from 'lexical';
import { $isLinkNode } from '@lexical/link';
import { $isListNode, ListNode } from '@lexical/list';
import { $isHeadingNode, $isQuoteNode } from '@lexical/rich-text';
import { $getNearestNodeOfType, mergeRegister, $findMatchingParent } from '@lexical/utils';

import { EditorState } from '../types';

export const useToolbarState = () => {
  const [editor] = useLexicalComposerContext();
  const [editorState, setEditorState] = useState<EditorState>({
    canUndo: false,
    canRedo: false,
    isBold: false,
    isItalic: false,
    isUnderline: false,
    isStrikethrough: false,
    isCode: false,
    isLink: false,
    blockType: 'paragraph',
  });

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    
    // Handle both collapsed (cursor) and range (selected text) selections
    if ($isRangeSelection(selection)) {
      // Check formats
      setEditorState(prev => ({
        ...prev,
        isBold: selection.hasFormat('bold'),
        isItalic: selection.hasFormat('italic'),
        isUnderline: selection.hasFormat('underline'),
        isStrikethrough: selection.hasFormat('strikethrough'),
        isCode: selection.hasFormat('code'),
      }));

      // Check for link
      const node = selection.anchor.getNode();
      const parent = node.getParent();
      if ($isLinkNode(parent) || $isLinkNode(node)) {
        setEditorState(prev => ({ ...prev, isLink: true }));
      } else {
        setEditorState(prev => ({ ...prev, isLink: false }));
      }

      // Check for block type
      const anchorNode = selection.anchor.getNode();
      let blockType = 'paragraph';
      
      // Find the top-level element that contains the selection
      const topLevelElement = anchorNode.getKey() === 'root'
        ? anchorNode
        : $findMatchingParent(anchorNode, (e) => {
            const parent = e.getParent();
            return parent !== null && $isRootOrShadowRoot(parent);
          }) || anchorNode.getTopLevelElementOrThrow();
      
      // Check if the top-level element is a specific block type
      if ($isHeadingNode(topLevelElement)) {
        blockType = topLevelElement.getTag();
      } else if ($isQuoteNode(topLevelElement)) {
        blockType = 'quote';
      } else if ($isListNode(topLevelElement)) {
        blockType = topLevelElement.getListType();
      } else {
        // Check for nested list items
        const listNode = $getNearestNodeOfType<ListNode>(anchorNode, ListNode);
        if (listNode) {
          blockType = listNode.getListType();
        }
      }
      
      setEditorState(prev => ({
        ...prev,
        blockType,
      }));
    }
  }, [editor]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState: lexicalEditorState }) => {
        lexicalEditorState.read(() => {
          updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          updateToolbar();
          return false;
        },
        COMMAND_PRIORITY_CRITICAL,
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        payload => {
          setEditorState(prev => ({ ...prev, canUndo: payload }));
          return false;
        },
        COMMAND_PRIORITY_CRITICAL,
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        payload => {
          setEditorState(prev => ({ ...prev, canRedo: payload }));
          return false;
        },
        COMMAND_PRIORITY_CRITICAL,
      ),
    );
  }, [editor, updateToolbar]);
  
  // Also update toolbar on initial mount
  useEffect(() => {
    editor.getEditorState().read(() => {
      updateToolbar();
    });
  }, [editor, updateToolbar]);

  return { editor, editorState };
};