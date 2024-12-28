import React, { useRef } from 'react';
import clsx from 'clsx';

import { ModalProps } from './types';
import { modalStyles } from './variants';

const CloseButton = () => {
  return (
    <button className='btn btn-circle btn-ghost btn-sm absolute right-2 top-2'>
      ✕
    </button>
  );
};

const Modal: React.FC<ModalProps> = ({
  size = 'md',
  position,
  open,
  responsive,
}) => {
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
      <dialog
        ref={modalRef}
        className={clsx('modal', modalStyles({ position, open, responsive }))}
      >
        <div className={clsx('modal-box', modalStyles({ size }))}>
          <h3 className='text-lg font-bold'>Hello!</h3>
          <p className='py-4'>
            Press ESC key or click the button below to close
          </p>
          <div className='modal-action'>
            <form method='dialog'>
              {/* {closeButton && <CloseButton />} */}
              <button className='btn'>Close</button>
            </form>
          </div>
        </div>
        <label
          className='modal-backdrop'
          onClick={() => modalRef.current?.close()}
        >
          Close
        </label>
      </dialog>
    </>
  );
};

export default Modal;
