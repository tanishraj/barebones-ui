import { Dispatch, FC, SetStateAction } from 'react';
import { LexicalEditor } from 'lexical';

import { DropDown, DropDownItem } from '../../components/Dropdown';
import { useToolbarState } from '../../context/ToolbarContext';
import { clearFormatting, dropDownActiveClass, formatParagraph } from './utils';
import { SHORTCUTS } from '../ShortcutsPlugin';

import './ToolbarPlugin.css';

interface ToolbarPluginProps {
  editor: LexicalEditor;
  activeEditor: LexicalEditor;
  setActiveEditor: Dispatch<SetStateAction<LexicalEditor>>;
  setIsLinkEditMode: Dispatch<boolean>;
  isEditable: boolean;
}

export const ToolbarPlugin: FC<ToolbarPluginProps> = ({
  editor,
  isEditable,
}) => {
  const {
    toolbarState: { blockType },
  } = useToolbarState();

  return (
    <div className='toolbar'>
      <DropDown
        disabled={!isEditable}
        buttonClassName='toolbar-item spaced'
        buttonLabel=''
        buttonAriaLabel='Formatting options for additional text styles'
        buttonIconClassName='icon dropdown-more'
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
          onClick={() => clearFormatting(editor)}
          className='item wide'
          title='Clear text formatting'
          aria-label='Clear all text formatting'
        >
          <div className='icon-text-container'>
            <i className='icon clear' />
            <span className='text'>Clear Formatting</span>
          </div>
          <span className='shortcut'>{SHORTCUTS.CLEAR_FORMATTING}</span>
        </DropDownItem>
      </DropDown>
    </div>
  );
};
