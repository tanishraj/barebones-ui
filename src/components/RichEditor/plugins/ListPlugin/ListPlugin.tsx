import { List, ListOrdered } from 'lucide-react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
} from '@lexical/list';

import { Button } from '../../../Button';

export const ListPlugin = () => {
  const [editor] = useLexicalComposerContext();

  return (
    <>
      <Button
        variant={'ghost'}
        softColor={true}
        size='sm'
        aria-label='Unordered List'
        icon={<List />}
        onClick={() => {
          console.log('Unordered List clicked');
          editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
        }}
      />

      <Button
        variant={'ghost'}
        softColor={true}
        size='sm'
        aria-label='Ordered List'
        icon={<ListOrdered />}
        onClick={() => {
          console.log('Ordered List clicked');
          editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
        }}
      />
    </>
  );
};
