import React, { useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import { LexicalEditor } from 'lexical';
import { Sigma } from 'lucide-react';

import { ToolbarButton } from '../ToolbarButton';
import { InsertEquationDialog } from '../../EquationsPlugin';

interface EquationSectionProps {
  editor: LexicalEditor;
}

export const EquationSection: React.FC<EquationSectionProps> = ({
  editor,
}) => {
  const [showEquationDialog, setShowEquationDialog] = useState(false);

  const handleInsertEquation = useCallback(() => {
    setShowEquationDialog(true);
  }, []);

  const handleClose = useCallback(() => {
    setShowEquationDialog(false);
  }, []);

  return (
    <>
      <div className='flex gap-1'>
        <ToolbarButton
          onClick={handleInsertEquation}
          icon={<Sigma className='h-4 w-4' />}
          label='Insert Equation'
        />
      </div>
      {showEquationDialog && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 prose-none">
          <div className="bg-base-100 rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col not-prose">
            <div className="flex items-center justify-between p-4 border-b border-base-300">
              <h3 className="text-lg font-semibold leading-normal">Insert Equation</h3>
              <button
                onClick={handleClose}
                className="btn btn-ghost btn-sm btn-circle"
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <InsertEquationDialog
              activeEditor={editor}
              onClose={handleClose}
            />
          </div>
        </div>,
        document.body
      )}
    </>
  );
};