import { List, ListOrdered } from 'lucide-react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
} from '@lexical/list';
import { FC } from 'react';

import { Button } from '../../../Button';
import { getSelectedBtnProps } from '../../utils';

interface ListPluginProps {
  blockType: string;
}

export const ListPlugin: FC<ListPluginProps> = ({ blockType }) => {
  const [editor] = useLexicalComposerContext();

  const handleUnorderedList = () => {
    if (blockType == 'ul') {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
    }
  };

  const handleOrderedList = () => {
    if (blockType == 'ol') {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
    }
  };

  return (
    <>
      <Button
        softColor={true}
        size='sm'
        aria-label='Unordered List'
        icon={<List />}
        onClick={handleUnorderedList}
        {...getSelectedBtnProps(blockType === 'ul')}
      />

      <Button
        softColor={true}
        size='sm'
        aria-label='Ordered List'
        icon={<ListOrdered />}
        onClick={handleOrderedList}
        {...getSelectedBtnProps(blockType === 'ol')}
      />
    </>
  );
};
