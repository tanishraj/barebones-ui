import { TOGGLE_LINK_COMMAND } from '@lexical/link';
import { HeadingTagType } from '@lexical/rich-text';
import {
  COMMAND_PRIORITY_NORMAL,
  FORMAT_TEXT_COMMAND,
  isModifierMatch,
  KEY_DOWN_COMMAND,
  LexicalEditor,
} from 'lexical';
import { Dispatch, useEffect } from 'react';

import { useToolbarState } from '../../context/ToolbarContext';
import { sanitizeUrl } from '../../utils/url';
import {
  formatBulletList,
  formatCode,
  formatHeading,
  formatNumberedList,
  formatParagraph,
} from '../ToolbarPlugin/utils';
import {
  isCapitalize,
  isFormatBulletList,
  isFormatCode,
  isFormatHeading,
  isFormatNumberedList,
  isFormatParagraph,
  isInsertLink,
  isLowercase,
  isStrikeThrough,
  isUppercase,
} from './shortcuts';

export default function ShortcutsPlugin({
  editor,
  setIsLinkEditMode,
}: {
  editor: LexicalEditor;
  setIsLinkEditMode: Dispatch<boolean>;
}): null {
  const { toolbarState } = useToolbarState();

  useEffect(() => {
    const keyboardShortcutsHandler = (event: KeyboardEvent) => {
      // Short-circuit, a least one modifier must be set
      if (isModifierMatch(event, {})) {
        return false;
      } else if (isFormatParagraph(event)) {
        formatParagraph(editor);
      } else if (isFormatHeading(event)) {
        const { code } = event;
        const headingSize = `h${code[code.length - 1]}` as HeadingTagType;
        formatHeading(editor, toolbarState.blockType, headingSize);
      } else if (isFormatBulletList(event)) {
        formatBulletList(editor, toolbarState.blockType);
      } else if (isFormatNumberedList(event)) {
        formatNumberedList(editor, toolbarState.blockType);
      } else if (isFormatCode(event)) {
        formatCode(editor, toolbarState.blockType);
      } else if (isStrikeThrough(event)) {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough');
      } else if (isLowercase(event)) {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'lowercase');
      } else if (isUppercase(event)) {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'uppercase');
      } else if (isCapitalize(event)) {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'capitalize');
      } else if (isInsertLink(event)) {
        const url = toolbarState.isLink ? null : sanitizeUrl('https://');
        setIsLinkEditMode(!toolbarState.isLink);
        editor.dispatchCommand(TOGGLE_LINK_COMMAND, url);
      } else {
        // No match for any of the event handlers
        return false;
      }
      event.preventDefault();
      return true;
    };

    return editor.registerCommand(
      KEY_DOWN_COMMAND,
      keyboardShortcutsHandler,
      COMMAND_PRIORITY_NORMAL,
    );
  }, [editor, toolbarState.isLink, toolbarState.blockType, setIsLinkEditMode]);

  return null;
}
