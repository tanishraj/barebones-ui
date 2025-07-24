import {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {
  $getRoot,
  $getSelection,
  $isElementNode,
  $isNodeSelection,
  $isParagraphNode,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  COMMAND_PRIORITY_CRITICAL,
  FORMAT_TEXT_COMMAND,
  LexicalEditor,
  LexicalNode,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from 'lexical';
import { $isHeadingNode } from '@lexical/rich-text';
import {
  $findMatchingParent,
  $getNearestNodeOfType,
  IS_APPLE,
  mergeRegister,
} from '@lexical/utils';
import { $isListNode, ListNode } from '@lexical/list';
import { $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link';
import { $isTableNode, $isTableSelection } from '@lexical/table';

import { DropDown, DropDownItem } from '../../components/Dropdown';
import {
  $findTopLevelElement,
  dropDownActiveClass,
  formatBulletList,
  formatHeading,
  formatNumberedList,
  formatParagraph,
} from './utils';
import {
  blockTypeToBlockName,
  useToolbarState,
} from '../../context/ToolbarContext';
import { SHORTCUTS } from '../ShortcutsPlugin';
import { Divider } from '../../components/Divider';
import { getSelectedNode } from '../../utils/getSelectedNode';
import { sanitizeUrl } from '../../utils/url';
import { useModal } from '../../hooks';
import { ShowClearDialog } from '../../components/Dialogs';
import { InsertEquationDialog } from '../EquationsPlugin';
import { InsertTableDialog } from '../TablePlugin';

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
  setIsLinkEditMode,
  setActiveEditor,
  isEditable,
}) => {
  const { toolbarState, updateToolbarState } = useToolbarState();
  const { blockType } = toolbarState;
  const [isEditorEmpty, setIsEditorEmpty] = useState(true);
  const [modal, showModal] = useModal();

  const $handleHeadingNode = useCallback(
    (selectedElement: LexicalNode) => {
      const type = $isHeadingNode(selectedElement)
        ? selectedElement.getTag()
        : selectedElement.getType();

      if (type in blockTypeToBlockName) {
        updateToolbarState(
          'blockType',
          type as keyof typeof blockTypeToBlockName,
        );
      }
    },
    [updateToolbarState],
  );

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();

    if ($isRangeSelection(selection)) {
      const anchorNode = selection?.anchor.getNode();
      const element = $findTopLevelElement(anchorNode);
      const elementKey = element.getKey();
      const elementDOM = activeEditor.getElementByKey(elementKey);

      // Update links
      const node = getSelectedNode(selection);
      const parent = node.getParent();
      const isLink = $isLinkNode(parent) || $isLinkNode(node);
      updateToolbarState('isLink', isLink);

      const tableNode = $findMatchingParent(node, $isTableNode);
      if ($isTableNode(tableNode)) {
        updateToolbarState('rootType', 'table');
      } else {
        updateToolbarState('rootType', 'root');
      }

      if (elementDOM !== null) {
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType<ListNode>(
            anchorNode,
            ListNode,
          );
          const type = parentList
            ? parentList.getListType()
            : element.getListType();

          updateToolbarState('blockType', type);
        } else {
          $handleHeadingNode(element);
        }
      }

      let matchingParent;
      if ($isLinkNode(parent)) {
        // If node is a link, we need to fetch the parent paragraph node to set format
        matchingParent = $findMatchingParent(
          node,
          parentNode => $isElementNode(parentNode) && !parentNode.isInline(),
        );
      }

      // If matchingParent is a valid node, pass it's format type
      updateToolbarState(
        'elementFormat',
        $isElementNode(matchingParent)
          ? matchingParent.getFormatType()
          : $isElementNode(node)
            ? node.getFormatType()
            : parent?.getFormatType() || 'left',
      );
    }

    if ($isRangeSelection(selection) || $isTableSelection(selection)) {
      updateToolbarState('isBold', selection.hasFormat('bold'));
      updateToolbarState('isItalic', selection.hasFormat('italic'));
      updateToolbarState('isUnderline', selection.hasFormat('underline'));
      updateToolbarState(
        'isStrikethrough',
        selection.hasFormat('strikethrough'),
      );
    }

    if ($isNodeSelection(selection)) {
      const nodes = selection.getNodes();
      for (const selectedNode of nodes) {
        const parentList = $getNearestNodeOfType<ListNode>(
          selectedNode,
          ListNode,
        );
        if (parentList) {
          const type = parentList.getListType();
          updateToolbarState('blockType', type);
        } else {
          const selectedElement = $findTopLevelElement(selectedNode);
          $handleHeadingNode(selectedElement);
          // Update elementFormat for node selection (e.g., images)
          if ($isElementNode(selectedElement)) {
            updateToolbarState(
              'elementFormat',
              selectedElement.getFormatType(),
            );
          }
        }
      }
    }
  }, [activeEditor, $handleHeadingNode, updateToolbarState]);

  useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      (_payload, newEditor) => {
        setActiveEditor(newEditor);
        $updateToolbar();
        return false;
      },
      COMMAND_PRIORITY_CRITICAL,
    );
  }, [editor, $updateToolbar, setActiveEditor]);

  useEffect(() => {
    activeEditor.getEditorState().read(() => {
      $updateToolbar();
    });
  }, [activeEditor, $updateToolbar]);

  useEffect(() => {
    return mergeRegister(
      activeEditor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateToolbar();
        });
      }),
      activeEditor.registerCommand<boolean>(
        CAN_UNDO_COMMAND,
        payload => {
          updateToolbarState('canUndo', payload);
          return false;
        },
        COMMAND_PRIORITY_CRITICAL,
      ),
      activeEditor.registerCommand<boolean>(
        CAN_REDO_COMMAND,
        payload => {
          updateToolbarState('canRedo', payload);
          return false;
        },
        COMMAND_PRIORITY_CRITICAL,
      ),
    );
  }, [$updateToolbar, activeEditor, editor, updateToolbarState]);

  useEffect(() => {
    return editor.registerUpdateListener(() => {
      editor.getEditorState().read(() => {
        const root = $getRoot();
        const children = root.getChildren();

        if (children.length > 1) {
          setIsEditorEmpty(false);
        } else {
          if ($isParagraphNode(children[0])) {
            const paragraphChildren = children[0].getChildren();
            setIsEditorEmpty(paragraphChildren.length === 0);
          } else {
            setIsEditorEmpty(false);
          }
        }
      });
    });
  }, [editor, isEditable]);

  const insertLink = useCallback(() => {
    if (!toolbarState.isLink) {
      setIsLinkEditMode(true);
      activeEditor.dispatchCommand(
        TOGGLE_LINK_COMMAND,
        sanitizeUrl('https://'),
      );
    } else {
      setIsLinkEditMode(false);
      activeEditor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
    }
  }, [activeEditor, setIsLinkEditMode, toolbarState.isLink]);

  if (!isEditable) {
    return null;
  }

  return (
    <div className='toolbar'>
      <div className='item'>
        <DropDown
          disabled={!isEditable}
          buttonClassName='toolbar-item block-controls'
          buttonIconClassName={'icon block-type ' + blockType}
          buttonLabel={blockTypeToBlockName[blockType]}
          buttonAriaLabel='Select Block'
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
        <button
          disabled={!isEditable}
          onClick={() => {
            activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
          }}
          className={
            'toolbar-item spaced ' + (toolbarState.isBold ? 'active' : '')
          }
          title={`Bold (${SHORTCUTS.BOLD})`}
          type='button'
          aria-label={`Format text as bold. Shortcut: ${SHORTCUTS.BOLD}`}
        >
          <i className='format bold' />
        </button>
        <button
          disabled={!isEditable}
          onClick={() => {
            activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
          }}
          className={
            'toolbar-item spaced ' + (toolbarState.isItalic ? 'active' : '')
          }
          title={`Italic (${SHORTCUTS.ITALIC})`}
          type='button'
          aria-label={`Format text as italics. Shortcut: ${SHORTCUTS.ITALIC}`}
        >
          <i className='format italic' />
        </button>
        <button
          disabled={!isEditable}
          onClick={() => {
            activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
          }}
          className={
            'toolbar-item spaced ' + (toolbarState.isUnderline ? 'active' : '')
          }
          title={`Underline (${SHORTCUTS.UNDERLINE})`}
          type='button'
          aria-label={`Format text to underlined. Shortcut: ${SHORTCUTS.UNDERLINE}`}
        >
          <i className='format underline' />
        </button>
        <button
          disabled={!isEditable}
          onClick={() => {
            activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough');
          }}
          className={
            'toolbar-item spaced ' +
            (toolbarState.isStrikethrough ? 'active' : '')
          }
          title={`Underline (${SHORTCUTS.STRIKETHROUGH})`}
          type='button'
          aria-label={`Format text to strike-through. Shortcut: ${SHORTCUTS.STRIKETHROUGH}`}
        >
          <i className='format strikethrough' />
        </button>
        <Divider />
        <button
          disabled={!isEditable}
          onClick={() => formatNumberedList(editor, blockType)}
          className={
            'toolbar-item spaced ' + (blockType === 'number' ? 'active' : '')
          }
          title={`Underline (${SHORTCUTS.NUMBERED_LIST})`}
          type='button'
          aria-label={`Format text to strike-through. Shortcut: ${SHORTCUTS.NUMBERED_LIST}`}
        >
          <i className='format numbered-list' />
        </button>
        <button
          disabled={!isEditable}
          onClick={() => formatBulletList(editor, blockType)}
          className={
            'toolbar-item spaced ' + (blockType === 'bullet' ? 'active' : '')
          }
          title={`Underline (${SHORTCUTS.BULLET_LIST})`}
          type='button'
          aria-label={`Format text to strike-through. Shortcut: ${SHORTCUTS.BULLET_LIST}`}
        >
          <i className='format bullet-list' />
        </button>
        <Divider />
        <button
          disabled={!isEditable}
          onClick={insertLink}
          className={
            'toolbar-item spaced ' + (toolbarState.isLink ? 'active' : '')
          }
          aria-label='Insert link'
          title={`Insert link (${SHORTCUTS.INSERT_LINK})`}
          type='button'
        >
          <i className='format link' />
        </button>
        <button
          disabled={!isEditable}
          onClick={() => {
            showModal('Insert Table', onClose => (
              <InsertTableDialog
                activeEditor={activeEditor}
                onClose={onClose}
              />
            ));
          }}
          className='toolbar-item spaced'
          aria-label='Insert table'
          title={`Insert table`}
          type='button'
        >
          <i className='format table-content' />
        </button>
        <button
          disabled={!isEditable}
          onClick={() => {
            showModal('Insert Equation', onClose => (
              <InsertEquationDialog
                activeEditor={activeEditor}
                onClose={onClose}
              />
            ));
          }}
          className='toolbar-item spaced'
          aria-label='Insert equation'
          title={`Insert equation`}
          type='button'
        >
          <i className='format equation' />
        </button>
      </div>
      <div className='item'>
        <button
          className='toolbar-item spaced'
          disabled={isEditorEmpty}
          onClick={() => {
            showModal('Clear editor', onClose => (
              <ShowClearDialog editor={editor} onClose={onClose} />
            ));
          }}
          title='Clear'
          aria-label='Clear editor contents'
          type='button'
        >
          <i className='format clear' />
        </button>
        <Divider />
        <button
          disabled={!toolbarState.canUndo || !isEditable}
          onClick={() => {
            activeEditor.dispatchCommand(UNDO_COMMAND, undefined);
          }}
          title={IS_APPLE ? 'Undo (⌘Z)' : 'Undo (Ctrl+Z)'}
          type='button'
          className='toolbar-item spaced'
          aria-label='Undo'
        >
          <i className='format undo' />
        </button>
        <button
          disabled={!toolbarState.canRedo || !isEditable}
          onClick={() => {
            activeEditor.dispatchCommand(REDO_COMMAND, undefined);
          }}
          title={IS_APPLE ? 'Redo (⇧⌘Z)' : 'Redo (Ctrl+Y)'}
          type='button'
          className='toolbar-item'
          aria-label='Redo'
        >
          <i className='format redo' />
        </button>
      </div>

      {modal}
    </div>
  );
};
