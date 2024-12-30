import React, { useRef } from 'react';
import clsx from 'clsx';

import { ModalProps } from './types';
import { modalStyles } from './variants';

const Modal: React.FC<ModalProps> = ({
  position,
  open,
  closeIcon,
  responsive,
  clickOutsideToClose,
  children,
  footer,
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
        <div className='modal-box'>
          {children}
          <div className='modal-action'>
            <form method='dialog'>
              {closeIcon && (
                <button className='btn btn-circle btn-ghost btn-sm absolute right-2 top-2'>
                  ✕
                </button>
              )}
              {footer}
            </form>
          </div>
        </div>
        {clickOutsideToClose && (
          <label
            className='modal-backdrop'
            onClick={() => modalRef.current?.close()}
          >
            Close
          </label>
        )}
      </dialog>
    </>
  );
};

export default Modal;
