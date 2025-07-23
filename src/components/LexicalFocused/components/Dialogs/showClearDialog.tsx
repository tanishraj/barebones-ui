import { CLEAR_EDITOR_COMMAND, LexicalEditor } from 'lexical';

import { Button } from '../Button';

export const ShowClearDialog = ({
  editor,
  onClose,
}: {
  editor: LexicalEditor;
  onClose: () => void;
}): JSX.Element => {
  return (
    <>
      Are you sure you want to clear the editor?
      <div className='Modal__footer'>
        <Button
          onClick={() => {
            editor.dispatchCommand(CLEAR_EDITOR_COMMAND, undefined);
            editor.focus();
            onClose();
          }}
        >
          Clear
        </Button>{' '}
        <Button
          onClick={() => {
            editor.focus();
            onClose();
          }}
        >
          Cancel
        </Button>
      </div>
    </>
  );
};
