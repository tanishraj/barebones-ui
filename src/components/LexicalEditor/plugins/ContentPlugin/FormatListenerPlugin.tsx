import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { FORMAT_TEXT_COMMAND, FORMAT_ELEMENT_COMMAND } from 'lexical';
import { useEffect } from 'react';

interface FormatListenerPluginProps {
  onFormatUpdate?: (isFormatUpdated: boolean) => void;
}

export function FormatListenerPlugin({
  onFormatUpdate,
}: FormatListenerPluginProps) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!onFormatUpdate) {
      return;
    }

    // A priority of 1 is normal. We want to listen to the commands and react,
    // but not block them from continuing their normal behavior.
    const removeFormatTextListener = editor.registerCommand(
      FORMAT_TEXT_COMMAND,
      () => {
        onFormatUpdate(true);
        return false; // Let other listeners handle this command.
      },
      1,
    );

    const removeFormatElementListener = editor.registerCommand(
      FORMAT_ELEMENT_COMMAND,
      () => {
        onFormatUpdate(true);
        return false;
      },
      1,
    );

    // Unregister listeners on cleanup
    return () => {
      removeFormatTextListener();
      removeFormatElementListener();
    };
  }, [editor, onFormatUpdate]);

  return null;
}
