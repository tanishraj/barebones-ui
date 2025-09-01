import { useEffect } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  $getSelection,
  $isRangeSelection,
  $createTextNode,
  $isTextNode,
  KEY_ARROW_RIGHT_COMMAND,
  KEY_ARROW_LEFT_COMMAND,
  COMMAND_PRIORITY_EDITOR,
  FORMAT_TEXT_COMMAND,
} from 'lexical';

export default function InlineCodeExitPlugin(): null {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    const removeCodeArrowRightCommand = editor.registerCommand(
      KEY_ARROW_RIGHT_COMMAND,
      event => {
        const selection = $getSelection();

        if (!$isRangeSelection(selection) || !selection.isCollapsed()) {
          return false;
        }

        const anchor = selection.anchor;
        const anchorNode = anchor.getNode();

        if (!$isTextNode(anchorNode)) {
          return false;
        }

        // Check if the node has code formatting
        if (!anchorNode.hasFormat('code')) {
          return false;
        }

        const textContent = anchorNode.getTextContent();
        const anchorOffset = anchor.offset;

        // Check if we're at the end of a code-formatted text node
        if (anchorOffset === textContent.length) {
          // Check if the next sibling exists and doesn't have code format
          const nextSibling = anchorNode.getNextSibling();

          if (
            !nextSibling ||
            ($isTextNode(nextSibling) && !nextSibling.hasFormat('code'))
          ) {
            event?.preventDefault();

            // Create a text node with zero-width non-joiner (invisible character)
            const textNode = $createTextNode('\u200C');
            anchorNode.insertAfter(textNode);
            // Position cursor after the invisible character
            textNode.select(1, 1);

            // Remove code formatting from selection
            const newSelection = $getSelection();
            if (
              $isRangeSelection(newSelection) &&
              newSelection.hasFormat('code')
            ) {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'code');
            }

            return true;
          }
        }

        return false;
      },
      COMMAND_PRIORITY_EDITOR,
    );

    const removeCodeArrowLeftCommand = editor.registerCommand(
      KEY_ARROW_LEFT_COMMAND,
      event => {
        const selection = $getSelection();

        if (!$isRangeSelection(selection) || !selection.isCollapsed()) {
          return false;
        }

        const anchor = selection.anchor;
        const anchorNode = anchor.getNode();

        if (!$isTextNode(anchorNode)) {
          return false;
        }

        // Check if the node has code formatting
        if (!anchorNode.hasFormat('code')) {
          return false;
        }

        const anchorOffset = anchor.offset;

        // Check if we're at the beginning of a code-formatted text node
        if (anchorOffset === 0) {
          // Check if the previous sibling exists and doesn't have code format
          const prevSibling = anchorNode.getPreviousSibling();

          if (
            !prevSibling ||
            ($isTextNode(prevSibling) && !prevSibling.hasFormat('code'))
          ) {
            event?.preventDefault();

            // Create a text node with zero-width non-joiner (invisible character)
            const textNode = $createTextNode('\u200C');
            anchorNode.insertBefore(textNode);
            textNode.select(1, 1);

            // Remove code formatting from selection
            const newSelection = $getSelection();
            if (
              $isRangeSelection(newSelection) &&
              newSelection.hasFormat('code')
            ) {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'code');
            }

            return true;
          }
        }

        return false;
      },
      COMMAND_PRIORITY_EDITOR,
    );

    return () => {
      removeCodeArrowRightCommand();
      removeCodeArrowLeftCommand();
    };
  }, [editor]);

  return null;
}
