import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  $getSelection,
  $isRangeSelection,
  $isRootOrShadowRoot,
  $createParagraphNode,
  COMMAND_PRIORITY_EDITOR,
  NodeKey,
  LexicalEditor,
} from 'lexical';
import {
  $createTableNodeWithDimensions,
  $deleteTableColumn__EXPERIMENTAL,
  $deleteTableRow__EXPERIMENTAL,
  $getTableCellNodeFromLexicalNode,
  $getTableNodeFromLexicalNodeOrThrow,
  $insertTableColumn__EXPERIMENTAL,
  $insertTableRow__EXPERIMENTAL,
  $isTableCellNode,
  $isTableNode,
  $isTableRowNode,
  $isTableSelection,
  $unmergeCell,
  INSERT_TABLE_COMMAND,
  TableCellNode,
  TableNode,
  TableRowNode,
  TableSelection,
} from '@lexical/table';
import { $insertNodes } from 'lexical';
import { mergeRegister } from '@lexical/utils';
import { TablePlugin as LexicalTablePlugin } from '@lexical/react/LexicalTablePlugin';

import TableActionMenu from '../../components/TableActionMenu';

export default function TablePlugin(): JSX.Element {
  const [editor] = useLexicalComposerContext();
  const [tableSelection, setTableSelection] = useState<TableSelection | null>(null);
  const [tableCellNode, setTableCellNode] = useState<TableCellNode | null>(null);
  const [menuPosition, setMenuPosition] = useState<{ x: number; y: number } | null>(null);
  const [isTableNode, setIsTableNode] = useState(false);

  useEffect(() => {
    if (!editor.hasNodes([TableNode, TableCellNode, TableRowNode])) {
      console.error(
        'TablePlugin: TableNode, TableCellNode or TableRowNode not registered on editor'
      );
      return;
    }

    const unregister = editor.registerCommand(
      INSERT_TABLE_COMMAND,
      ({ columns, rows, includeHeaders }) => {
        const selection = $getSelection();

        if (!$isRangeSelection(selection)) {
          return true;
        }

        const focus = selection.focus;
        const focusNode = focus.getNode();

        if (focusNode !== null) {
          const tableNode = $createTableNodeWithDimensions(
            Number(rows),
            Number(columns),
            includeHeaders,
          );

          if ($isRootOrShadowRoot(focusNode)) {
            const target = focusNode.getChildAtIndex(focus.offset);

            if (target !== null) {
              target.insertBefore(tableNode);
            } else {
              focusNode.append(tableNode);
            }

            tableNode.insertBefore($createParagraphNode());
          } else {
            const topLevelNode = focusNode.getTopLevelElementOrThrow();
            topLevelNode.insertAfter(tableNode);
          }

          tableNode.insertAfter($createParagraphNode());
          const firstCell = tableNode
            .getFirstChild()
            ?.getFirstChild();
          
          if ($isTableCellNode(firstCell)) {
            firstCell.select();
          }
        }

        return true;
      },
      COMMAND_PRIORITY_EDITOR,
    );

    return () => {
      unregister();
    };
  }, [editor]);

  // Handle table selection updates
  useEffect(() => {
    const unregister = editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const selection = $getSelection();
        
        if ($isTableSelection(selection)) {
          setTableSelection(selection);
          
          const anchor = selection.anchor.getNode();
          const cell = $getTableCellNodeFromLexicalNode(anchor);
          setTableCellNode(cell);
          
          // Check if we're in a table
          if (cell) {
            const table = $getTableNodeFromLexicalNodeOrThrow(cell);
            setIsTableNode(true);
          }
        } else if ($isRangeSelection(selection)) {
          const anchorNode = selection.anchor.getNode();
          const cell = $getTableCellNodeFromLexicalNode(anchorNode);
          
          setTableCellNode(cell);
          setTableSelection(null);
          setIsTableNode(cell !== null);
        } else {
          setTableSelection(null);
          setTableCellNode(null);
          setIsTableNode(false);
        }
      });
    });

    return unregister;
  }, [editor]);

  // Table manipulation callbacks
  const handleInsertRowAbove = useCallback(() => {
    editor.update(() => {
      if (tableCellNode) {
        $insertTableRow__EXPERIMENTAL(false);
      }
    });
  }, [editor, tableCellNode]);

  const handleInsertRowBelow = useCallback(() => {
    editor.update(() => {
      if (tableCellNode) {
        $insertTableRow__EXPERIMENTAL(true);
      }
    });
  }, [editor, tableCellNode]);

  const handleInsertColumnLeft = useCallback(() => {
    editor.update(() => {
      if (tableCellNode) {
        $insertTableColumn__EXPERIMENTAL(false);
      }
    });
  }, [editor, tableCellNode]);

  const handleInsertColumnRight = useCallback(() => {
    editor.update(() => {
      if (tableCellNode) {
        $insertTableColumn__EXPERIMENTAL(true);
      }
    });
  }, [editor, tableCellNode]);

  const handleDeleteRow = useCallback(() => {
    editor.update(() => {
      if (tableCellNode) {
        $deleteTableRow__EXPERIMENTAL();
      }
    });
  }, [editor, tableCellNode]);

  const handleDeleteColumn = useCallback(() => {
    editor.update(() => {
      if (tableCellNode) {
        $deleteTableColumn__EXPERIMENTAL();
      }
    });
  }, [editor, tableCellNode]);

  const handleDeleteTable = useCallback(() => {
    editor.update(() => {
      if (tableCellNode) {
        const tableNode = $getTableNodeFromLexicalNodeOrThrow(tableCellNode);
        tableNode.remove();
      }
    });
  }, [editor, tableCellNode]);

  const handleUnmergeCells = useCallback(() => {
    editor.update(() => {
      if (tableCellNode) {
        $unmergeCell();
      }
    });
  }, [editor, tableCellNode]);

  // Show context menu on right click
  useEffect(() => {
    const handleContextMenu = (event: MouseEvent) => {
      event.preventDefault();
      
      editor.getEditorState().read(() => {
        const selection = $getSelection();
        
        if ($isRangeSelection(selection) || $isTableSelection(selection)) {
          const anchorNode = selection.anchor.getNode();
          const cell = $getTableCellNodeFromLexicalNode(anchorNode);
          
          if (cell) {
            setMenuPosition({ x: event.clientX, y: event.clientY });
          }
        }
      });
    };

    const rootElement = editor.getRootElement();
    if (rootElement) {
      rootElement.addEventListener('contextmenu', handleContextMenu);
    }

    return () => {
      if (rootElement) {
        rootElement.removeEventListener('contextmenu', handleContextMenu);
      }
    };
  }, [editor]);

  return (
    <>
      <LexicalTablePlugin
        hasCellMerge={false}
        hasCellBackgroundColor={false}
        hasTabHandler={true}
      />
      {menuPosition && tableCellNode && (
        <TableActionMenu
          position={menuPosition}
          onClose={() => setMenuPosition(null)}
          onInsertRowAbove={handleInsertRowAbove}
          onInsertRowBelow={handleInsertRowBelow}
          onInsertColumnLeft={handleInsertColumnLeft}
          onInsertColumnRight={handleInsertColumnRight}
          onDeleteRow={handleDeleteRow}
          onDeleteColumn={handleDeleteColumn}
          onDeleteTable={handleDeleteTable}
          onUnmergeCells={handleUnmergeCells}
          canUnmergeCells={tableCellNode.getColSpan() > 1 || tableCellNode.getRowSpan() > 1}
        />
      )}
    </>
  );
}