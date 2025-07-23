import {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {
  $getSelection,
  $isElementNode,
  $isNodeSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_LOW,
  LexicalEditor,
  LexicalNode,
  NodeKey,
  SELECTION_CHANGE_COMMAND,
} from 'lexical';
import { $isHeadingNode } from '@lexical/rich-text';
import {
  $findMatchingParent,
  $getNearestNodeOfType,
  mergeRegister,
} from '@lexical/utils';
import { $isListNode, ListNode } from '@lexical/list';
import { $isLinkNode } from '@lexical/link';
import { $isTableNode, $isTableSelection } from '@lexical/table';

import { DropDown, DropDownItem } from '../../components/Dropdown';
import {
  $findTopLevelElement,
  dropDownActiveClass,
  formatHeading,
  formatParagraph,
} from './utils';
import {
  blockTypeToBlockName,
  useToolbarState,
} from '../../context/ToolbarContext';
import { SHORTCUTS } from '../ShortcutsPlugin';
import { Divider } from '../../components/Divider';
import { getSelectedNode } from '../../utils/getSelectedNode';

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
  isEditable,
}) => {
  const { toolbarState, updateToolbarState } = useToolbarState();
  const { blockType } = toolbarState;
  const [selectedElementKey, setSelectedElementKey] = useState<NodeKey | null>(
    null,
  );

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
        setSelectedElementKey(elementKey);
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
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          $updateToolbar();
          return false;
        },
        COMMAND_PRIORITY_LOW,
      ),
    );
  }, [editor, $updateToolbar]);

  useEffect(() => {
    activeEditor.getEditorState().read(() => {
      $updateToolbar();
    });
  }, [$updateToolbar, activeEditor]);

  useEffect(() => {
    return mergeRegister(
      activeEditor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateToolbar();
        });
      }),
    );
  }, [$updateToolbar, activeEditor]);

  if (!isEditable) {
    return null;
  }

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
