import { FORMAT_TEXT_COMMAND, TextFormatType } from 'lexical';
import { INSERT_UNORDERED_LIST_COMMAND } from '@lexical/list';

export const COMMANDS = {
  FORMAT_TEXT_COMMAND: FORMAT_TEXT_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND: INSERT_UNORDERED_LIST_COMMAND,
};

export const FORMAT_TEXT_COMMAND_PAYLOAD: Record<string, TextFormatType> = {
  BOLD: 'bold',
  ITALIC: 'italic',
  UNDERLINE: 'underline',
  STRIKETHROUGH: 'strikethrough',
};
