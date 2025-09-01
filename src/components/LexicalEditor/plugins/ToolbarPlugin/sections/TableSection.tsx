import React, { useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import { LexicalEditor } from 'lexical';
import { Table } from 'lucide-react';
import { INSERT_TABLE_COMMAND } from '@lexical/table';

import { ToolbarButton } from '../ToolbarButton';
import TableSelector from '../../../components/TableSelector';

interface TableSectionProps {
  editor: LexicalEditor;
}

export const TableSection: React.FC<TableSectionProps> = ({ editor }) => {
  const [showTableSelector, setShowTableSelector] = useState(false);

  const handleInsertTable = useCallback(() => {
    setShowTableSelector(true);
  }, []);

  const handleTableInsert = useCallback(
    (rows: number, cols: number) => {
      editor.dispatchCommand(INSERT_TABLE_COMMAND, {
        rows: String(rows),
        columns: String(cols),
        includeHeaders: true,
      });
      setShowTableSelector(false);
    },
    [editor],
  );

  const handleCancel = useCallback(() => {
    setShowTableSelector(false);
  }, []);

  return (
    <>
      <div className='flex gap-1'>
        <ToolbarButton
          onClick={handleInsertTable}
          icon={<Table className='h-4 w-4' />}
          label='Insert Table'
        />
      </div>
      {showTableSelector && createPortal(
        <TableSelector
          onInsert={handleTableInsert}
          onCancel={handleCancel}
        />,
        document.body
      )}
    </>
  );
};