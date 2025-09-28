import React from 'react';
import { LexicalEditor } from 'lexical';
import { Sigma } from 'lucide-react';

import { ToolbarButton } from '../ToolbarButton';
import { InsertEquationDialog } from '../../EquationsPlugin';
import useModal from '../../../hooks/useModal';

interface EquationSectionProps {
  editor: LexicalEditor;
}

export const EquationSection: React.FC<EquationSectionProps> = ({
  editor,
}) => {
  const [modal, showModal] = useModal();

  return (
    <>
      <div className='flex gap-1'>
        <ToolbarButton
          onClick={() => {
            showModal('Insert Equation', (onClose) => (
              <InsertEquationDialog
                activeEditor={editor}
                onClose={onClose}
              />
            ));
          }}
          icon={<Sigma className='h-4 w-4' />}
          label='Insert Equation'
        />
      </div>
      {modal}
    </>
  );
};