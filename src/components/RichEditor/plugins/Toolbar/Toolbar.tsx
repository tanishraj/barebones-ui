import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { FORMAT_TEXT_COMMAND } from 'lexical';

import { RICH_TEXT_TOOLBAR_OPTIONS, RichTextToolbarActions } from './constants';
import { Button } from '../../../Button';

export const ToolbarPlugin = () => {
  const [editor] = useLexicalComposerContext();

  const handleAction = (actionId: RichTextToolbarActions) => {
    switch (actionId) {
      case RichTextToolbarActions.BOLD:
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
        break;
      case RichTextToolbarActions.ITALIC:
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
        break;
      case RichTextToolbarActions.UNDERLINE:
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
        break;
      case RichTextToolbarActions.STRIKETHROUGH:
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough');
        break;
      case RichTextToolbarActions.SUBSCRIPT:
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'subscript');
        break;
      case RichTextToolbarActions.SUPERSCRIPT:
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'superscript');
        break;
      case RichTextToolbarActions.HIGHLIGHT:
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'highlight');
        break;
      case RichTextToolbarActions.CODE:
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'code');
        break;
      case RichTextToolbarActions.LEFT_ALIGN:
        break;
      case RichTextToolbarActions.CENTER_ALIGN:
        break;
      case RichTextToolbarActions.RIGHT_ALIGN:
        break;
      case RichTextToolbarActions.JUSTIFY_ALIGN:
        break;
      case RichTextToolbarActions.DIVIDER:
        break;
      case RichTextToolbarActions.UNDO:
        break;
      case RichTextToolbarActions.REDO:
        break;
      default:
        console.warn(`Action ${actionId} is not implemented.`);
        break;
    }
  };

  return (
    <div className='join'>
      {RICH_TEXT_TOOLBAR_OPTIONS.map(item => (
        <Button
          size='sm'
          className='join-item'
          key={item.id}
          icon={item.icon}
          aria-label={item.label}
          onClick={() => handleAction(item.id)}
        />
      ))}
    </div>
  );
};
