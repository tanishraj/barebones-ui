import type { JSX } from 'react';
import * as React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useLexicalEditable } from '@lexical/react/useLexicalEditable';
import '../../styles/TableActionMenu.css';
import {
  $deleteTableColumnAtSelection,
  $deleteTableRowAtSelection,
  $getTableCellNodeFromLexicalNode,
  $getTableNodeFromLexicalNodeOrThrow,
  $insertTableColumnAtSelection,
  $insertTableRowAtSelection,
  $isTableSelection,
  TableCellNode,
} from '@lexical/table';
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_CRITICAL,
  SELECTION_CHANGE_COMMAND,
} from 'lexical';
import { ChevronDown } from 'lucide-react';

type TableCellActionMenuProps = Readonly<{
  contextRef: { current: null | HTMLElement };
  menuRef?: React.RefObject<HTMLDivElement>;
  onClose: () => void;
  tableCellNode: TableCellNode;
}>;

function TableActionMenu({
  onClose,
  tableCellNode: _tableCellNode,
  contextRef,
  menuRef,
}: TableCellActionMenuProps) {
  const [editor] = useLexicalComposerContext();
  const dropDownRef = menuRef || useRef<HTMLDivElement | null>(null);
  const [tableCellNode, updateTableCellNode] = useState(_tableCellNode);

  useEffect(() => {
    return editor.registerMutationListener(
      TableCellNode,
      nodeMutations => {
        const nodeUpdated =
          nodeMutations.get(tableCellNode.getKey()) === 'updated';

        if (nodeUpdated) {
          editor.getEditorState().read(() => {
            updateTableCellNode(tableCellNode.getLatest());
          });
        }
      },
      { skipInitialization: true },
    );
  }, [editor, tableCellNode]);

  useEffect(() => {
    const menuButtonElement = contextRef.current;
    const dropDownElement = dropDownRef.current;
    const rootElement = editor.getRootElement();

    if (
      menuButtonElement != null &&
      dropDownElement != null &&
      rootElement != null
    ) {
      const rootEleRect = rootElement.getBoundingClientRect();
      const menuButtonRect = menuButtonElement.getBoundingClientRect();
      dropDownElement.style.opacity = '1';
      const dropDownElementRect = dropDownElement.getBoundingClientRect();
      const margin = 5;
      let leftPosition = menuButtonRect.right + margin;
      if (
        leftPosition + dropDownElementRect.width > window.innerWidth ||
        leftPosition + dropDownElementRect.width > rootEleRect.right
      ) {
        const position =
          menuButtonRect.left - dropDownElementRect.width - margin;
        leftPosition = (position < 0 ? margin : position) + window.scrollX;
      }
      dropDownElement.style.left = `${leftPosition + window.scrollX}px`;

      let topPosition = menuButtonRect.top;
      if (topPosition + dropDownElementRect.height > window.innerHeight) {
        const position = menuButtonRect.bottom - dropDownElementRect.height;
        topPosition = position < 0 ? margin : position;
      }
      dropDownElement.style.top = `${topPosition + window.scrollY}px`;
    }
  }, [contextRef, editor]);

  const insertTableRowAtSelection = useCallback(
    (shouldInsertAfter: boolean) => {
      editor.update(() => {
        $insertTableRowAtSelection(shouldInsertAfter);
      });
      onClose();
    },
    [editor, onClose],
  );

  const insertTableColumnAtSelection = useCallback(
    (shouldInsertAfter: boolean) => {
      editor.update(() => {
        $insertTableColumnAtSelection(shouldInsertAfter);
      });
      onClose();
    },
    [editor, onClose],
  );

  const deleteTableRowAtSelection = useCallback(() => {
    editor.update(() => {
      $deleteTableRowAtSelection();
    });
    onClose();
  }, [editor, onClose]);

  const deleteTableColumnAtSelection = useCallback(() => {
    editor.update(() => {
      $deleteTableColumnAtSelection();
    });
    onClose();
  }, [editor, onClose]);

  const deleteTableAtSelection = useCallback(() => {
    editor.update(() => {
      const tableNode = $getTableNodeFromLexicalNodeOrThrow(tableCellNode);
      tableNode.remove();
    });
    onClose();
  }, [editor, onClose, tableCellNode]);

  return createPortal(
    <div
      ref={dropDownRef}
      className='fixed z-50 bg-base-100 rounded-lg shadow-xl border border-base-300 py-1 min-w-[200px] opacity-0'
      onClick={e => e.stopPropagation()}
    >
      <button
        type='button'
        className='w-full px-3 py-2 text-sm text-left hover:bg-base-200 transition-colors'
        onClick={() => insertTableRowAtSelection(false)}
      >
        Insert row above
      </button>
      <button
        type='button'
        className='w-full px-3 py-2 text-sm text-left hover:bg-base-200 transition-colors'
        onClick={() => insertTableRowAtSelection(true)}
      >
        Insert row below
      </button>

      <div className='divider my-1 mx-2' />

      <button
        type='button'
        className='w-full px-3 py-2 text-sm text-left hover:bg-base-200 transition-colors'
        onClick={() => insertTableColumnAtSelection(false)}
      >
        Insert column left
      </button>
      <button
        type='button'
        className='w-full px-3 py-2 text-sm text-left hover:bg-base-200 transition-colors'
        onClick={() => insertTableColumnAtSelection(true)}
      >
        Insert column right
      </button>

      <div className='divider my-1 mx-2' />

      <button
        type='button'
        className='w-full px-3 py-2 text-sm text-left hover:bg-base-200 transition-colors'
        onClick={deleteTableRowAtSelection}
      >
        Delete row
      </button>
      <button
        type='button'
        className='w-full px-3 py-2 text-sm text-left hover:bg-base-200 transition-colors'
        onClick={deleteTableColumnAtSelection}
      >
        Delete column
      </button>

      <div className='divider my-1 mx-2' />

      <button
        type='button'
        className='w-full px-3 py-2 text-sm text-left hover:bg-base-200 transition-colors text-error'
        onClick={deleteTableAtSelection}
      >
        Delete table
      </button>
    </div>,
    document.body,
  );
}

type TableCellActionMenuContainerProps = Readonly<{
  anchorElem: HTMLElement;
}>;

function TableCellActionMenuContainer({
  anchorElem,
}: TableCellActionMenuContainerProps): JSX.Element {
  const [editor] = useLexicalComposerContext();
  const isEditable = useLexicalEditable();
  const menuButtonRef = useRef<HTMLDivElement>(null);
  const menuRootRef = useRef<HTMLDivElement | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [tableCellNode, setTableCellNode] = useState<TableCellNode | null>(
    null,
  );

  const $moveMenu = useCallback(() => {
    const menu = menuButtonRef.current;
    const selection = $getSelection();
    const nativeSelection = window.getSelection();

    function disable() {
      if (menu) {
        menu.classList.remove('table-cell-action-button-container--active');
        menu.classList.add('table-cell-action-button-container--inactive');
      }
      setTableCellNode(null);
    }

    if (selection == null || menu == null) {
      return disable();
    }

    const rootElement = editor.getRootElement();
    let tableCellParentNodeDOM: HTMLElement | null = null;
    let tableCellNodeFromSelection: TableCellNode | null = null;

    if (
      $isRangeSelection(selection) &&
      rootElement !== null &&
      nativeSelection !== null &&
      rootElement.contains(nativeSelection.anchorNode)
    ) {
      tableCellNodeFromSelection = $getTableCellNodeFromLexicalNode(
        selection.anchor.getNode(),
      );
    } else if ($isTableSelection(selection)) {
      tableCellNodeFromSelection = $getTableCellNodeFromLexicalNode(
        selection.anchor.getNode(),
      );
    }

    if (tableCellNodeFromSelection == null) {
      return disable();
    }

    tableCellParentNodeDOM = editor.getElementByKey(
      tableCellNodeFromSelection.getKey(),
    );

    if (tableCellParentNodeDOM == null) {
      return disable();
    }

    setTableCellNode(tableCellNodeFromSelection);

    // Enable the menu
    menu.classList.add('table-cell-action-button-container--active');
    menu.classList.remove('table-cell-action-button-container--inactive');

    // Position the menu button at the top-right corner of the cell
    const tableCellRect = tableCellParentNodeDOM.getBoundingClientRect();
    const anchorRect = anchorElem.getBoundingClientRect();

    const top = tableCellRect.top - anchorRect.top + 4;
    const left = tableCellRect.right - anchorRect.left - 30; // Position inside the cell

    menu.style.transform = `translate(${left}px, ${top}px)`;
  }, [editor, anchorElem]);

  useEffect(() => {
    const unregister = editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      () => {
        editor.getEditorState().read(() => {
          const selection = $getSelection();
          // Close menu if selection changed to a different cell
          if (
            selection &&
            ($isRangeSelection(selection) || $isTableSelection(selection))
          ) {
            const currentCellNode = $getTableCellNodeFromLexicalNode(
              selection.anchor.getNode(),
            );
            if (tableCellNode && currentCellNode) {
              if (currentCellNode.getKey() !== tableCellNode.getKey()) {
                setIsMenuOpen(false);
              }
            }
          }
        });
        $moveMenu();
        return false;
      },
      COMMAND_PRIORITY_CRITICAL,
    );

    return () => {
      unregister();
    };
  }, [editor, $moveMenu, tableCellNode]);

  useEffect(() => {
    editor.getEditorState().read(() => {
      $moveMenu();
    });
  }, [editor, $moveMenu]);

  const handleToggleMenu = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMenuOpen(prev => !prev);
  }, []);

  const handleClose = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  // Close menu when table cell changes
  const prevTableCellNode = useRef(tableCellNode);
  useEffect(() => {
    if (
      prevTableCellNode.current !== tableCellNode &&
      prevTableCellNode.current !== null
    ) {
      setIsMenuOpen(false);
    }
    prevTableCellNode.current = tableCellNode;
  }, [tableCellNode]);

  // Close menu when clicking outside or when focus changes
  useEffect(() => {
    if (isMenuOpen) {
      const handleClickOutside = (e: MouseEvent) => {
        if (
          menuRootRef.current &&
          !menuRootRef.current.contains(e.target as Node) &&
          !menuButtonRef.current?.contains(e.target as Node)
        ) {
          setIsMenuOpen(false);
        }
      };

      const handleFocusChange = () => {
        // Close menu when editor content is focused (but not the menu itself)
        const activeElement = document.activeElement;
        if (
          activeElement &&
          editor.getRootElement()?.contains(activeElement) &&
          !menuButtonRef.current?.contains(activeElement) &&
          !menuRootRef.current?.contains(activeElement)
        ) {
          setIsMenuOpen(false);
        }
      };

      document.addEventListener('click', handleClickOutside);
      document.addEventListener('focusin', handleFocusChange);

      return () => {
        document.removeEventListener('click', handleClickOutside);
        document.removeEventListener('focusin', handleFocusChange);
      };
    }
  }, [isMenuOpen, editor]);

  return (
    <>
      <div
        ref={menuButtonRef}
        className='table-cell-action-button-container absolute z-10 top-0 left-0 will-change-transform table-cell-action-button-container--inactive'
        style={{
          transform: 'translate(0, 0)',
        }}
      >
        {tableCellNode != null && isEditable && (
          <button
            type='button'
            className='table-cell-action-button flex items-center justify-center w-5 h-5 bg-base-100 border border-base-300 rounded hover:bg-base-200 shadow-sm cursor-pointer mt-1 -ml-6'
            onClick={handleToggleMenu}
            aria-label='Table actions'
          >
            <ChevronDown className='h-3 w-3' />
          </button>
        )}
      </div>

      {isMenuOpen && tableCellNode && (
        <TableActionMenu
          onClose={handleClose}
          tableCellNode={tableCellNode}
          contextRef={menuButtonRef}
          menuRef={menuRootRef}
        />
      )}
    </>
  );
}

export default function TableActionMenuPlugin(): JSX.Element | null {
  const [editor] = useLexicalComposerContext();
  const [anchorElem, setAnchorElem] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const rootElement = editor.getRootElement();
    if (rootElement) {
      setAnchorElem(rootElement.parentElement || rootElement);
    }
  }, [editor]);

  if (!anchorElem) {
    return null;
  }

  return createPortal(
    <TableCellActionMenuContainer anchorElem={anchorElem} />,
    anchorElem,
  );
}
