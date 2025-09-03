import type { ElementNode, LexicalEditor } from 'lexical';
import type { JSX } from 'react';

import * as React from 'react';
import { ReactPortal, useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useLexicalEditable } from '@lexical/react/useLexicalEditable';
import {
  $computeTableMapSkipCellCheck,
  $deleteTableColumnAtSelection,
  $deleteTableRowAtSelection,
  $getNodeTriplet,
  $getTableCellNodeFromLexicalNode,
  $getTableColumnIndexFromTableCellNode,
  $getTableNodeFromLexicalNodeOrThrow,
  $getTableRowIndexFromTableCellNode,
  $insertTableColumnAtSelection,
  $insertTableRowAtSelection,
  $isTableCellNode,
  $isTableSelection,
  $mergeCells,
  $unmergeCell,
  getTableElement,
  getTableObserverFromTableElement,
  TableCellHeaderStates,
  TableCellNode,
  TableObserver,
  TableSelection,
} from '@lexical/table';
import { mergeRegister } from '@lexical/utils';
import {
  $getSelection,
  $isElementNode,
  $isRangeSelection,
  $isTextNode,
  $setSelection,
  COMMAND_PRIORITY_CRITICAL,
  getDOMSelection,
  SELECTION_CHANGE_COMMAND,
} from 'lexical';
import { ChevronDown } from 'lucide-react';

import useModal from '../../hooks/useModal';
import ColorPicker from '../../components/ColorPicker';

function computeSelectionCount(selection: TableSelection): {
  columns: number;
  rows: number;
} {
  const selectionShape = selection.getShape();
  return {
    columns: selectionShape.toX - selectionShape.fromX + 1,
    rows: selectionShape.toY - selectionShape.fromY + 1,
  };
}

function $canUnmerge(): boolean {
  const selection = $getSelection();
  if (
    ($isRangeSelection(selection) && !selection.isCollapsed()) ||
    ($isTableSelection(selection) && !selection.anchor.is(selection.focus)) ||
    (!$isRangeSelection(selection) && !$isTableSelection(selection))
  ) {
    return false;
  }
  const [cell] = $getNodeTriplet(selection.anchor);
  return cell.__colSpan > 1 || cell.__rowSpan > 1;
}

function $selectLastDescendant(node: ElementNode): void {
  const lastDescendant = node.getLastDescendant();
  if ($isTextNode(lastDescendant)) {
    lastDescendant.select();
  } else if ($isElementNode(lastDescendant)) {
    lastDescendant.selectEnd();
  } else if (lastDescendant !== null) {
    lastDescendant.selectNext();
  }
}

function currentCellBackgroundColor(editor: LexicalEditor): null | string {
  return editor.getEditorState().read(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection) || $isTableSelection(selection)) {
      const [cell] = $getNodeTriplet(selection.anchor);
      if ($isTableCellNode(cell)) {
        return cell.getBackgroundColor();
      }
    }
    return null;
  });
}

type TableCellActionMenuProps = Readonly<{
  contextRef: { current: null | HTMLElement };
  onClose: () => void;
  setIsMenuOpen: (isOpen: boolean) => void;
  showColorPickerModal: (
    title: string,
    showModal: (onClose: () => void) => JSX.Element,
  ) => void;
  tableCellNode: TableCellNode;
  cellMerge: boolean;
}>;

function TableActionMenu({
  onClose,
  tableCellNode: _tableCellNode,
  setIsMenuOpen,
  contextRef,
  cellMerge,
  showColorPickerModal,
}: TableCellActionMenuProps) {
  const [editor] = useLexicalComposerContext();
  const dropDownRef = useRef<HTMLDivElement | null>(null);
  const [tableCellNode, updateTableCellNode] = useState(_tableCellNode);
  const [selectionCounts, updateSelectionCounts] = useState({
    columns: 1,
    rows: 1,
  });
  const [canMergeCells, setCanMergeCells] = useState(false);
  const [canUnmergeCell, setCanUnmergeCell] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState(
    () => currentCellBackgroundColor(editor) || '',
  );

  useEffect(() => {
    return editor.registerMutationListener(
      TableCellNode,
      (nodeMutations) => {
        const nodeUpdated =
          nodeMutations.get(tableCellNode.getKey()) === 'updated';

        if (nodeUpdated) {
          editor.getEditorState().read(() => {
            updateTableCellNode(tableCellNode.getLatest());
          });
          setBackgroundColor(currentCellBackgroundColor(editor) || '');
        }
      },
      { skipInitialization: true },
    );
  }, [editor, tableCellNode]);

  useEffect(() => {
    editor.getEditorState().read(() => {
      const selection = $getSelection();
      // Merge cells
      if ($isTableSelection(selection)) {
        const currentSelectionCounts = computeSelectionCount(selection);
        updateSelectionCounts(computeSelectionCount(selection));
        setCanMergeCells(
          currentSelectionCounts.columns > 1 || currentSelectionCounts.rows > 1,
        );
      }
      // Unmerge cell
      setCanUnmergeCell($canUnmerge());
    });
  }, [editor]);

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

  const mergeTableCellsAtSelection = useCallback(() => {
    editor.update(() => {
      $mergeCells();
    });
    onClose();
  }, [editor, onClose]);

  const unmergeTableCellAtSelection = useCallback(() => {
    editor.update(() => {
      $unmergeCell();
    });
    onClose();
  }, [editor, onClose]);

  const handleCellBackgroundColor = useCallback(
    (value: string) => {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection) || $isTableSelection(selection)) {
          const [cell] = $getNodeTriplet(selection.anchor);
          if ($isTableCellNode(cell)) {
            cell.setBackgroundColor(value);
          }
          if ($isTableSelection(selection)) {
            const nodes = selection.getNodes();
            nodes.forEach((node) => {
              if ($isTableCellNode(node)) {
                node.setBackgroundColor(value);
              }
            });
          }
        }
      });
    },
    [editor],
  );

  let mergeCellButton: null | JSX.Element = null;
  if (cellMerge) {
    if (canMergeCells) {
      mergeCellButton = (
        <button
          type="button"
          className="w-full px-3 py-2 text-sm text-left hover:bg-base-200 transition-colors"
          onClick={mergeTableCellsAtSelection}
        >
          Merge cells
        </button>
      );
    } else if (canUnmergeCell) {
      mergeCellButton = (
        <button
          type="button"
          className="w-full px-3 py-2 text-sm text-left hover:bg-base-200 transition-colors"
          onClick={unmergeTableCellAtSelection}
        >
          Unmerge cells
        </button>
      );
    }
  }

  return createPortal(
    <div
      ref={dropDownRef}
      className="fixed z-50 bg-base-100 rounded-lg shadow-xl border border-base-300 py-1 min-w-[200px] opacity-0"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        className="w-full px-3 py-2 text-sm text-left hover:bg-base-200 transition-colors"
        onClick={() => insertTableRowAtSelection(false)}
      >
        Insert{' '}
        {selectionCounts.rows === 1 ? 'row' : `${selectionCounts.rows} rows`}{' '}
        above
      </button>
      <button
        type="button"
        className="w-full px-3 py-2 text-sm text-left hover:bg-base-200 transition-colors"
        onClick={() => insertTableRowAtSelection(true)}
      >
        Insert{' '}
        {selectionCounts.rows === 1 ? 'row' : `${selectionCounts.rows} rows`}{' '}
        below
      </button>

      <div className="divider my-1 mx-2" />

      <button
        type="button"
        className="w-full px-3 py-2 text-sm text-left hover:bg-base-200 transition-colors"
        onClick={() => insertTableColumnAtSelection(false)}
      >
        Insert{' '}
        {selectionCounts.columns === 1
          ? 'column'
          : `${selectionCounts.columns} columns`}{' '}
        left
      </button>
      <button
        type="button"
        className="w-full px-3 py-2 text-sm text-left hover:bg-base-200 transition-colors"
        onClick={() => insertTableColumnAtSelection(true)}
      >
        Insert{' '}
        {selectionCounts.columns === 1
          ? 'column'
          : `${selectionCounts.columns} columns`}{' '}
        right
      </button>

      {mergeCellButton}

      <div className="divider my-1 mx-2" />

      <button
        type="button"
        className="w-full px-3 py-2 text-sm text-left hover:bg-base-200 transition-colors"
        onClick={deleteTableRowAtSelection}
      >
        Delete row{selectionCounts.rows > 1 ? 's' : ''}
      </button>
      <button
        type="button"
        className="w-full px-3 py-2 text-sm text-left hover:bg-base-200 transition-colors"
        onClick={deleteTableColumnAtSelection}
      >
        Delete column{selectionCounts.columns > 1 ? 's' : ''}
      </button>

      <div className="divider my-1 mx-2" />

      <button
        type="button"
        className="w-full px-3 py-2 text-sm text-left hover:bg-base-200 transition-colors text-error"
        onClick={deleteTableAtSelection}
      >
        Delete table
      </button>

      <div className="divider my-1 mx-2" />

      <button
        type="button"
        className="w-full px-3 py-2 text-sm text-left hover:bg-base-200 transition-colors"
        onClick={() =>
          showColorPickerModal(
            'Cell background color',
            (onClose) => (
              <ColorPicker
                color={backgroundColor}
                onChange={handleCellBackgroundColor}
                onClose={onClose}
              />
            ),
          )
        }
      >
        <div className="flex items-center gap-2">
          <div
            className="w-4 h-4 border border-base-300 rounded"
            style={{ backgroundColor: backgroundColor || 'white' }}
          />
          <span>Background color</span>
        </div>
      </button>
    </div>,
    document.body,
  );
}

type TableCellActionMenuContainerProps = Readonly<{
  anchorElem: HTMLElement;
  cellMerge?: boolean;
}>;

function TableCellActionMenuContainer({
  anchorElem,
  cellMerge = true,
}: TableCellActionMenuContainerProps): JSX.Element {
  const [editor] = useLexicalComposerContext();
  const isEditable = useLexicalEditable();
  const menuButtonRef = useRef<HTMLDivElement>(null);
  const menuRootRef = useRef<HTMLDivElement | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [tableCellNode, setTableCellNode] = useState<TableCellNode | null>(
    null,
  );

  const [colorPickerModal, showColorPickerModal] = useModal();

  const $moveMenu = useCallback(() => {
    const menu = menuButtonRef.current;
    const selection = $getSelection();
    const nativeSelection = window.getSelection();

    if (selection == null || menu == null) {
      setTableCellNode(null);
      return;
    }

    const rootElement = editor.getRootElement();

    if (
      $isRangeSelection(selection) &&
      rootElement !== null &&
      nativeSelection !== null &&
      rootElement.contains(nativeSelection.anchorNode)
    ) {
      const tableCellNodeFromSelection = $getTableCellNodeFromLexicalNode(
        selection.anchor.getNode(),
      );

      if (tableCellNodeFromSelection == null) {
        setTableCellNode(null);
        return;
      }

      const tableCellParentNodeDOM = editor.getElementByKey(
        tableCellNodeFromSelection.getKey(),
      );

      if (tableCellParentNodeDOM == null) {
        setTableCellNode(null);
        return;
      }

      setTableCellNode(tableCellNodeFromSelection);

      const tableCellRect = tableCellParentNodeDOM.getBoundingClientRect();
      const anchorRect = anchorElem.getBoundingClientRect();

      const top = tableCellRect.top - anchorRect.top + 4;
      const left = tableCellRect.right - anchorRect.left - 36;

      menu.style.opacity = '1';
      menu.style.transform = `translate(${left}px, ${top}px)`;
    } else if ($isTableSelection(selection)) {
      const tableCellNodeFromSelection = $getTableCellNodeFromLexicalNode(
        selection.anchor.getNode(),
      );

      if (tableCellNodeFromSelection == null) {
        setTableCellNode(null);
        return;
      }

      const tableCellParentNodeDOM = editor.getElementByKey(
        tableCellNodeFromSelection.getKey(),
      );

      if (tableCellParentNodeDOM == null) {
        setTableCellNode(null);
        return;
      }

      setTableCellNode(tableCellNodeFromSelection);

      const tableCellRect = tableCellParentNodeDOM.getBoundingClientRect();
      const anchorRect = anchorElem.getBoundingClientRect();

      const top = tableCellRect.top - anchorRect.top + 4;
      const left = tableCellRect.right - anchorRect.left - 36;

      menu.style.opacity = '1';
      menu.style.transform = `translate(${left}px, ${top}px)`;
    } else {
      setTableCellNode(null);
    }
  }, [editor, anchorElem]);

  useEffect(() => {
    const unregister = editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      () => {
        $moveMenu();
        return false;
      },
      COMMAND_PRIORITY_CRITICAL,
    );

    return () => {
      unregister();
    };
  }, [editor, $moveMenu]);

  useEffect(() => {
    editor.getEditorState().read(() => {
      $moveMenu();
    });
  }, [editor, $moveMenu]);

  const handleToggleMenu = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setIsMenuOpen((prev) => !prev);
    },
    [],
  );

  const handleClose = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

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

      document.addEventListener('click', handleClickOutside);
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }
  }, [isMenuOpen]);

  if (!isEditable || !tableCellNode) {
    return <></>;
  }

  const showMenu = tableCellNode !== null;

  return (
    <>
      <div
        ref={menuButtonRef}
        className={`absolute z-10 will-change-transform ${
          showMenu
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        } transition-opacity duration-200`}
        style={{
          transform: 'translate(0, 0)',
        }}
      >
        <button
          type="button"
          className="flex items-center justify-center w-7 h-7 bg-base-100 border border-base-300 rounded hover:bg-base-200 shadow-sm cursor-pointer"
          onClick={handleToggleMenu}
          aria-label="Table actions"
        >
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>

      {isMenuOpen && tableCellNode && (
        <TableActionMenu
          onClose={handleClose}
          tableCellNode={tableCellNode}
          setIsMenuOpen={setIsMenuOpen}
          contextRef={menuButtonRef}
          cellMerge={cellMerge}
          showColorPickerModal={showColorPickerModal}
        />
      )}
      {colorPickerModal}
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
    <TableCellActionMenuContainer anchorElem={anchorElem} cellMerge={true} />,
    anchorElem,
  );
}