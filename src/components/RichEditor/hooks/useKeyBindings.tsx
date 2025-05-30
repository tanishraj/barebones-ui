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
  console.log('useKeyBindings initialized');
  const [editor] = useLexicalComposerContext();

  editor.registerCommand(
    KEY_ENTER_COMMAND,
    event => {
      console.log('Enter key pressed', event?.key);
      if (event?.key === 'B' && event.ctrlKey) {
        console.log('Ctrl+B pressed');
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
