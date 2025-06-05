import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { KEY_ENTER_COMMAND } from 'lexical';

import {
  LOW_PRIORIRTY,
  RichTextToolbarActions,
} from '../plugins/Toolbar/constants';

export interface KeyBindingsProps {
  onAction: (actionId: RichTextToolbarActions) => void;
}

export const useKeyBindings = ({ onAction }: KeyBindingsProps) => {
  const [editor] = useLexicalComposerContext();

  editor.registerCommand(
    KEY_ENTER_COMMAND,
    event => {
      if (event?.key === 'B' && event.ctrlKey) {
        onAction(RichTextToolbarActions.BOLD);
      }
      if (event?.key === 'I' && event?.ctrlKey) {
        onAction(RichTextToolbarActions.ITALIC);
      }
      if (event?.key === 'U' && event?.ctrlKey) {
        onAction(RichTextToolbarActions.UNDERLINE);
      }
      if (event?.key === 'Z' && event?.ctrlKey) {
        onAction(RichTextToolbarActions.UNDO);
      }
      if (
        (event?.key === 'Y' && event?.ctrlKey) ||
        (event?.key === 'Z' && event?.ctrlKey && event.shiftKey)
      ) {
        onAction(RichTextToolbarActions.REDO);
      }
      return false;
    },
    LOW_PRIORIRTY,
  );

  return {};
};
