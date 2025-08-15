import { Bold, Italic, Strikethrough, Underline } from 'lucide-react';
import { TextFormatType } from 'lexical';

import { FORMAT_TEXT_COMMAND_PAYLOAD } from './commands';
import { ToolbarStateKey } from '../context';

export type FormatOption = {
  label: string;
  aria: string;
  payload: TextFormatType;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  activeClass: ToolbarStateKey;
};

export const FORMAT_OPTIONS: FormatOption[] = [
  {
    label: 'Bold (⌘+B)',
    aria: 'Format text as bold.',
    payload: FORMAT_TEXT_COMMAND_PAYLOAD.BOLD,
    Icon: Bold,
    activeClass: 'isBold',
  },
  {
    label: 'Italic (⌘+I)',
    aria: 'Format text as italics. Shortcut: ⌘+I',
    payload: FORMAT_TEXT_COMMAND_PAYLOAD.ITALIC,
    Icon: Italic,
    activeClass: 'isItalic',
  },
  {
    label: 'Underline (⌘+U)',
    aria: 'Format text to underline. Shortcut: ⌘+U',
    payload: FORMAT_TEXT_COMMAND_PAYLOAD.UNDERLINE,
    Icon: Underline,
    activeClass: 'isUnderline',
  },
  {
    label: 'Strikethrough (⌘+Shift+X)',
    aria: 'Format text to underline. Shortcut: ⌘+Shift+X',
    payload: FORMAT_TEXT_COMMAND_PAYLOAD.STRIKETHROUGH,
    Icon: Strikethrough,
    activeClass: 'isStrikethrough',
  },
];
