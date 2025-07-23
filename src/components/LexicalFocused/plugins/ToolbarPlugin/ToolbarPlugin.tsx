import { Dispatch, FC, SetStateAction } from 'react';
import { LexicalEditor } from 'lexical';

import { DropDown, DropDownItem } from '../../components/Dropdown';
import { dropDownActiveClass, formatHeading, formatParagraph } from './utils';
import {
  blockTypeToBlockName,
  useToolbarState,
} from '../../context/ToolbarContext';
import { SHORTCUTS } from '../ShortcutsPlugin';
import { Divider } from '../../components/Divider';

interface ToolbarPluginProps {
  editor: LexicalEditor;
  activeEditor: LexicalEditor;
  setActiveEditor: Dispatch<SetStateAction<LexicalEditor>>;
  setIsLinkEditMode: Dispatch<boolean>;
  isEditable: boolean;
}

export const ToolbarPlugin: FC<ToolbarPluginProps> = ({
  editor,
  activeEditor,
  setActiveEditor,
  setIsLinkEditMode,
  isEditable,
}) => {
  const { toolbarState, updateToolbarState } = useToolbarState();
  const { blockType } = toolbarState;
  return (
    <div className='toolbar'>
      <DropDown
        disabled={!isEditable}
        buttonClassName='toolbar-item block-controls'
        buttonIconClassName={'icon block-type ' + blockType}
        buttonLabel={blockTypeToBlockName[blockType]}
        buttonAriaLabel='Select language'
      >
        <DropDownItem
          className={
            'item wide ' + dropDownActiveClass(blockType === 'paragraph')
          }
          onClick={() => formatParagraph(editor)}
        >
          <div className='icon-text-container'>
            <i className='icon paragraph' />
            <span className='text'>Normal</span>
          </div>
          <span className='shortcut'>{SHORTCUTS.NORMAL}</span>
        </DropDownItem>
        <DropDownItem
          className={'item wide ' + dropDownActiveClass(blockType === 'h1')}
          onClick={() => formatHeading(editor, blockType, 'h1')}
        >
          <div className='icon-text-container'>
            <i className='icon h1' />
            <span className='text'>Heading 1</span>
          </div>
          <span className='shortcut'>{SHORTCUTS.HEADING1}</span>
        </DropDownItem>
        <DropDownItem
          className={'item wide ' + dropDownActiveClass(blockType === 'h2')}
          onClick={() => formatHeading(editor, blockType, 'h2')}
        >
          <div className='icon-text-container'>
            <i className='icon h2' />
            <span className='text'>Heading 2</span>
          </div>
          <span className='shortcut'>{SHORTCUTS.HEADING2}</span>
        </DropDownItem>
        <DropDownItem
          className={'item wide ' + dropDownActiveClass(blockType === 'h3')}
          onClick={() => formatHeading(editor, blockType, 'h3')}
        >
          <div className='icon-text-container'>
            <i className='icon h3' />
            <span className='text'>Heading 3</span>
          </div>
          <span className='shortcut'>{SHORTCUTS.HEADING3}</span>
        </DropDownItem>
      </DropDown>
      <Divider />
    </div>
  );
};
