/**
 * ShortcutsPlugin - Handles keyboard shortcuts for the Lexical Editor
 * Aligned with Lexical Playground implementation
 */

import { useEffect } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_LOW,
  FORMAT_TEXT_COMMAND,
  KEY_MODIFIER_COMMAND,
  LexicalEditor,
} from 'lexical';
import { $setBlocksType } from '@lexical/selection';
import { $createHeadingNode, $createQuoteNode } from '@lexical/rich-text';
import { $createParagraphNode } from 'lexical';
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
} from '@lexical/list';
import { TOGGLE_LINK_COMMAND } from '@lexical/link';
import { sanitizeUrl } from '../../utils/url';

const IS_APPLE = typeof navigator !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(navigator.platform);

const ShortcutsPlugin = (): null => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    const handleKeyboardShortcuts = (event: KeyboardEvent, editor: LexicalEditor): boolean => {
      const { code, ctrlKey, metaKey, shiftKey, altKey } = event;
      
      // Platform-specific modifier check
      const primaryModifier = IS_APPLE ? metaKey : ctrlKey;
      
      // Strikethrough: Cmd/Ctrl + Shift + X
      if (code === 'KeyX' && primaryModifier && shiftKey && !altKey) {
        event.preventDefault();
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough');
        return true;
      }
      
      // Quote: Ctrl + Shift + Q (both platforms)
      if (code === 'KeyQ' && ctrlKey && shiftKey && !altKey) {
        event.preventDefault();
        editor.update(() => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            $setBlocksType(selection, () => $createQuoteNode());
          }
        });
        return true;
      }
      
      // Headings: Cmd/Ctrl + Alt + 1-6
      if (primaryModifier && altKey && !shiftKey) {
        const keyNumber = code[code.length - 1];
        if (['1', '2', '3', '4', '5', '6'].includes(keyNumber)) {
          event.preventDefault();
          editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
              $setBlocksType(selection, () => $createHeadingNode(`h${keyNumber}` as any));
            }
          });
          return true;
        }
        
        // Normal/Paragraph: Cmd/Ctrl + Alt + 0
        if (code === 'Digit0' || code === 'Numpad0') {
          event.preventDefault();
          editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
              $setBlocksType(selection, () => $createParagraphNode());
            }
          });
          return true;
        }
      }
      
      // Lists: Cmd/Ctrl + Shift + 7/8
      if (primaryModifier && shiftKey && !altKey) {
        if (code === 'Digit7' || code === 'Numpad7') {
          event.preventDefault();
          editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
          return true;
        }
        if (code === 'Digit8' || code === 'Numpad8') {
          event.preventDefault();
          editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
          return true;
        }
      }
      
      // Link: Cmd/Ctrl + K
      if (code === 'KeyK' && primaryModifier && !shiftKey && !altKey) {
        event.preventDefault();
        editor.dispatchCommand(TOGGLE_LINK_COMMAND, sanitizeUrl('https://'));
        return true;
      }
      
      return false;
    };

    return editor.registerCommand(
      KEY_MODIFIER_COMMAND,
      (event: KeyboardEvent) => {
        return handleKeyboardShortcuts(event, editor);
      },
      COMMAND_PRIORITY_LOW,
    );
  }, [editor]);

  return null;
};

export default ShortcutsPlugin;