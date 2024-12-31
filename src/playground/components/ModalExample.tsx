import { useState } from 'react';

import { Modal } from '@/components';

export const ModalExample = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  return (
    <div className='card card-bordered p-4 shadow-sm'>
      <div className='card-title'>Modal:</div>

      <div className='card card-bordered p-4 shadow-sm'>
        <div className='card-title'>Basic Modal:</div>
        <div className='card-body flex flex-row flex-wrap gap-2'>
          <button className='btn' onClick={handleOpen}>
            Open Modal
          </button>
          <Modal
            isOpen={isModalOpen}
            onClose={handleClose}
            size={'md'}
            showCloseButton
            closeOnBackdropClick
            footerContent={
              <button className='btn' onClick={handleClose}>
                Close
              </button>
            }
          >
            <h3 className='text-lg font-bold'>Hello!</h3>
            <p>This is a modal triggered by a button.</p>
          </Modal>
        </div>
      </div>
    </div>
  );
};
