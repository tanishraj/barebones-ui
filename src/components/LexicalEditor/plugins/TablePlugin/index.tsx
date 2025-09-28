import type { JSX } from 'react';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  INSERT_TABLE_COMMAND,
  TableCellNode,
  TableNode,
  TableRowNode,
} from '@lexical/table';
import { EditorThemeClasses, Klass, LexicalEditor, LexicalNode } from 'lexical';
import { TablePlugin as LexicalTablePlugin } from '@lexical/react/LexicalTablePlugin';

export type InsertTableCommandPayload = Readonly<{
  columns: string;
  rows: string;
  includeHeaders?: boolean;
}>;

export type CellContextShape = {
  cellEditorConfig: null | CellEditorConfig;
  cellEditorPlugins: null | JSX.Element | Array<JSX.Element>;
  set: (
    cellEditorConfig: null | CellEditorConfig,
    cellEditorPlugins: null | JSX.Element | Array<JSX.Element>,
  ) => void;
};

export type CellEditorConfig = Readonly<{
  namespace: string;
  nodes?: ReadonlyArray<Klass<LexicalNode>>;
  onError: (error: Error, editor: LexicalEditor) => void;
  readOnly?: boolean;
  theme?: EditorThemeClasses;
}>;

const CellContext = createContext<CellContextShape>({
  cellEditorConfig: null,
  cellEditorPlugins: null,
  set: () => {
    // Empty
  },
});

export { CellContext };

export function TableContext({ children }: { children: JSX.Element }) {
  const [contextValue, setContextValue] = useState<{
    cellEditorConfig: null | CellEditorConfig;
    cellEditorPlugins: null | JSX.Element | Array<JSX.Element>;
  }>({
    cellEditorConfig: null,
    cellEditorPlugins: null,
  });

  return (
    <CellContext.Provider
      value={useMemo(
        () => ({
          cellEditorConfig: contextValue.cellEditorConfig,
          cellEditorPlugins: contextValue.cellEditorPlugins,
          set: (cellEditorConfig, cellEditorPlugins) => {
            setContextValue({ cellEditorConfig, cellEditorPlugins });
          },
        }),
        [contextValue.cellEditorConfig, contextValue.cellEditorPlugins],
      )}
    >
      {children}
    </CellContext.Provider>
  );
}

export function InsertTableDialog({
  activeEditor,
  onClose,
}: {
  activeEditor: LexicalEditor;
  onClose: () => void;
}): JSX.Element {
  const [rows, setRows] = useState('5');
  const [columns, setColumns] = useState('5');
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    const row = Number(rows);
    const column = Number(columns);
    if (row && row > 0 && row <= 500 && column && column > 0 && column <= 50) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [rows, columns]);

  const onClick = () => {
    activeEditor.dispatchCommand(INSERT_TABLE_COMMAND, {
      columns,
      rows,
      includeHeaders: {
        rows: true, // Keep row headers (first row as headers)
        columns: false, // No column headers (first column)
      },
    });
    onClose();
  };

  return (
    <div className='space-y-4'>
      <div>
        <label className='label'>
          <span className='text-sm font-medium'>Rows</span>
        </label>
        <input
          type='number'
          placeholder='# of rows (1-500)'
          onChange={e => setRows(e.target.value)}
          value={rows}
          className='input input-bordered w-full'
          min='1'
          max='500'
        />
      </div>
      <div>
        <label className='label'>
          <span className='text-sm font-medium'>Columns</span>
        </label>
        <input
          type='number'
          placeholder='# of columns (1-50)'
          onChange={e => setColumns(e.target.value)}
          value={columns}
          className='input input-bordered w-full'
          min='1'
          max='50'
        />
      </div>
      <div className='flex justify-end'>
        <button
          className='btn btn-primary btn-sm'
          disabled={isDisabled}
          onClick={onClick}
        >
          Confirm
        </button>
      </div>
    </div>
  );
}

export default function TablePlugin({
  cellEditorConfig,
  children,
}: {
  cellEditorConfig?: CellEditorConfig;
  children?: JSX.Element | Array<JSX.Element>;
}): JSX.Element | null {
  const [editor] = useLexicalComposerContext();
  const cellContext = useContext(CellContext);

  useEffect(() => {
    if (!editor.hasNodes([TableNode, TableRowNode, TableCellNode])) {
      throw new Error(
        'TablePlugin: TableNode, TableRowNode, or TableCellNode is not registered on editor',
      );
    }

    if (cellEditorConfig) {
      cellContext.set(cellEditorConfig, children || null);
    }

    return () => {
      if (cellEditorConfig) {
        cellContext.set(null, null);
      }
    };
  }, [cellContext, cellEditorConfig, children, editor]);

  return (
    <LexicalTablePlugin
      hasCellMerge={false}
      hasCellBackgroundColor={false}
      hasTabHandler={true}
    />
  );
}
