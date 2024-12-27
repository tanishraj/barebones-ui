import React, { useRef } from 'react';

import { ModalProps } from './types';

const Modal: React.FC<ModalProps> = () => {
  const modalRef = useRef<HTMLDialogElement | null>(null);

  const handleClick = () => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

  return (
    <>
      <button className='btn' onClick={handleClick}>
        open modal
      </button>
      <dialog ref={modalRef} className='modal'>
        <div className='modal-box'>
          <h3 className='text-lg font-bold'>Hello!</h3>
          <p className='py-4'>
            Press ESC key or click the button below to close
          </p>
          <div className='modal-action'>
            <form method='dialog'>
              {/* if there is a button in form, it will close the modal */}
              <button className='btn'>Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Modal;
