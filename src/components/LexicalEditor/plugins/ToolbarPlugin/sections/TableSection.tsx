import React, { useCallback, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { LexicalEditor } from 'lexical';
import { Table } from 'lucide-react';
import { INSERT_TABLE_COMMAND } from '@lexical/table';

import { ToolbarButton } from '../ToolbarButton';
import TableSelectorMinimal from '../../../components/TableSelectorMinimal';

interface TableSectionProps {
  editor: LexicalEditor;
}

export const TableSection: React.FC<TableSectionProps> = ({ editor }) => {
  const [showTableSelector, setShowTableSelector] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);

  const handleToggleSelector = useCallback(() => {
    setShowTableSelector(!showTableSelector);
  }, [showTableSelector]);

  const handleTableInsert = useCallback(
    (rows: number, cols: number) => {
      // Focus the editor first if it's not focused
      if (!editor.getRootElement()?.contains(document.activeElement)) {
        editor.focus();
      }

      editor.dispatchCommand(INSERT_TABLE_COMMAND, {
        rows: String(rows),
        columns: String(cols),
        includeHeaders: {
          rows: true, // Keep row headers (first row as headers)
          columns: false, // No column headers (first column)
        },
      });
      setShowTableSelector(false);
    },
    [editor],
  );

  const handleClose = useCallback(() => {
    setShowTableSelector(false);
  }, []);

  return (
    <>
      <div className='flex gap-1' ref={buttonRef}>
        <ToolbarButton
          onClick={handleToggleSelector}
          icon={<Table className='h-4 w-4' />}
          label='Insert Table'
          active={showTableSelector}
        />
      </div>
      {showTableSelector &&
        createPortal(
          <TableSelectorMinimal
            onInsert={handleTableInsert}
            onClose={handleClose}
            anchorElement={buttonRef.current}
          />,
          document.body,
        )}
    </>
  );
};
