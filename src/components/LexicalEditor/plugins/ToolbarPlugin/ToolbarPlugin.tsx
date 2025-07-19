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
  $isRangeSelection,
  $isRootOrShadowRoot,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  COMMAND_PRIORITY_CRITICAL,
  COMMAND_PRIORITY_LOW,
  LexicalEditor,
  LexicalNode,
  NodeKey,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from 'lexical';
import { $isListNode, ListNode } from '@lexical/list';
import { $isHeadingNode } from '@lexical/rich-text';
import { $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link';
import { $isCodeNode, CODE_LANGUAGE_MAP } from '@lexical/code';
import { $isTableNode, $isTableSelection } from '@lexical/table';
import {
  $findMatchingParent,
  $getNearestNodeOfType,
  mergeRegister,
} from '@lexical/utils';
import { $isParentElementRTL } from '@lexical/selection';
import { List, ListOrdered, Table } from 'lucide-react';

import { COMMANDS } from '../../constants/commands';
import { FORMAT_OPTIONS } from '../../constants/formatOptions';
import {
  blockTypeToBlockName,
  useToolbarState,
} from '../../context/ToolbarContext';
import {
  formatBulletList,
  formatHeading,
  formatNumberedList,
  formatParagraph,
} from './utils';
import { getSelectedNode } from '../../utils/getSelectedNode';
import { useModal } from '../../hooks';
import { InsertTableDialog } from '../TablePlugin';
import { InsertEquationDialog } from '../EquationsPlugin';
import { sanitizeUrl } from '../../utils/url';

interface ToolbarPluginProps {
  editor: LexicalEditor;
  activeEditor: LexicalEditor;
  setActiveEditor: Dispatch<SetStateAction<LexicalEditor>>;
  setIsLinkEditMode: Dispatch<boolean>;
}

function $findTopLevelElement(node: LexicalNode) {
  let topLevelElement =
    node.getKey() === 'root'
      ? node
      : $findMatchingParent(node, e => {
          const parent = e.getParent();
          return parent !== null && $isRootOrShadowRoot(parent);
        });

  if (topLevelElement === null) {
    topLevelElement = node.getTopLevelElementOrThrow();
  }
  return topLevelElement;
}

export const ToolbarPlugin: FC<ToolbarPluginProps> = ({
  editor,
  activeEditor,
  setActiveEditor,
  setIsLinkEditMode,
}) => {
  const [selectedElementKey, setSelectedElementKey] = useState<NodeKey | null>(
    null,
  );
  const [isEditable, setIsEditable] = useState(() => editor.isEditable());
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const { toolbarState, updateToolbarState } = useToolbarState();
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

  const $handleCodeNode = useCallback(
    (element: LexicalNode) => {
      if ($isCodeNode(element)) {
        const language =
          element.getLanguage() as keyof typeof CODE_LANGUAGE_MAP;
        updateToolbarState(
          'codeLanguage',
          language ? CODE_LANGUAGE_MAP[language] || language : '',
        );
        return;
      }
    },
    [updateToolbarState],
  );

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

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();

    if ($isRangeSelection(selection)) {
      const anchorNode = selection?.anchor.getNode();
      const element = $findTopLevelElement(anchorNode);
      const elementKey = element.getKey();
      const elementDOM = activeEditor.getElementByKey(elementKey);

      updateToolbarState('isRTL', $isParentElementRTL(selection));

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
          $handleCodeNode(element);
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
  }, [$handleCodeNode, $handleHeadingNode, activeEditor, updateToolbarState]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, _newEditor) => {
          $updateToolbar();
          return false;
        },
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        payload => {
          setCanUndo(payload);
          return false;
        },
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        payload => {
          setCanRedo(payload);
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
  }, [activeEditor, $updateToolbar]);

  useEffect(() => {
    return mergeRegister(
      activeEditor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateToolbar();
        });
      }),
    );
  }, [activeEditor, $updateToolbar]);

  if (!isEditable) {
    return null;
  }

  return (
    <div className='toolbar'>
      <button
        disabled={!canUndo}
        onClick={() => {
          editor.dispatchCommand(UNDO_COMMAND, undefined);
        }}
        className='toolbar-item spaced'
        aria-label='Undo'
      >
        <i className='format undo' />
      </button>
      <button
        disabled={!canRedo}
        onClick={() => {
          editor.dispatchCommand(REDO_COMMAND, undefined);
        }}
        className='toolbar-item'
        aria-label='Redo'
      >
        <i className='format redo' />
      </button>
      <button
        className={`toolbar-item spaced ${toolbarState.blockType === 'paragraph' ? 'active' : ''}`}
        onClick={() => formatParagraph(editor)}
      >
        <i className='icon paragraph' />
      </button>
      <button
        className={`toolbar-item spaced ${toolbarState.blockType === 'h1' ? 'active' : ''}`}
        onClick={() => formatHeading(editor, toolbarState.blockType, 'h1')}
      >
        <i className='icon h1' />
      </button>
      <button
        className={`toolbar-item spaced ${toolbarState.blockType === 'h2' ? 'active' : ''}`}
        onClick={() => formatHeading(editor, toolbarState.blockType, 'h2')}
      >
        <i className='icon h2' />
      </button>
      <button
        className={`toolbar-item spaced ${toolbarState.blockType === 'h3' ? 'active' : ''}`}
        onClick={() => formatHeading(editor, toolbarState.blockType, 'h3')}
      >
        <i className='icon h3' />
      </button>
      {FORMAT_OPTIONS.map(({ label, aria, payload, Icon, activeClass }) => (
        <button
          key={label}
          className={`toolbar-item spaced ${toolbarState[activeClass] ? 'active' : ''}`}
          title={label}
          type='button'
          aria-label={aria}
          onClick={() => {
            activeEditor.dispatchCommand(COMMANDS.FORMAT_TEXT_COMMAND, payload);
          }}
        >
          <Icon />
        </button>
      ))}

      <button
        className={`toolbar-item spaced ${toolbarState.blockType === 'bullet' ? 'active' : ''}`}
        onClick={() => formatBulletList(editor, toolbarState.blockType)}
      >
        <List />
      </button>

      <button
        className={`toolbar-item spaced ${toolbarState.blockType === 'number' ? 'active' : ''}`}
        onClick={() => formatNumberedList(editor, toolbarState.blockType)}
      >
        <ListOrdered />
      </button>

      <button
        disabled={!isEditable}
        onClick={insertLink}
        className={
          'toolbar-item spaced ' + (toolbarState.isLink ? 'active' : '')
        }
        aria-label='Insert link'
        title={`Insert link (⌘+K)`}
        type='button'
      >
        <i className='format link' />
      </button>

      <button
        className={`toolbar-item spaced ${toolbarState.rootType === 'table' ? 'active' : ''}`}
        onClick={() => {
          showModal('Insert Table', onClose => (
            <InsertTableDialog activeEditor={activeEditor} onClose={onClose} />
          ));
        }}
      >
        <Table />
      </button>
      <button
        className={`toolbar-item spaced ${toolbarState.blockType === 'number' ? 'active' : ''}`}
        onClick={() => {
          showModal('Insert Equation', onClose => (
            <InsertEquationDialog
              activeEditor={activeEditor}
              onClose={onClose}
            />
          ));
        }}
      >
        <i className='icon equation' />
      </button>
      {modal}
    </div>
  );
};
