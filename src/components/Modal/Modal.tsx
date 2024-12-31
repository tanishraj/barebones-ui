import React, { useRef } from 'react';
import clsx from 'clsx';

import { ModalProps } from './types';
import { modalStyles } from './variants';

const Modal: React.FC<ModalProps> = ({
  position,
  isOpen,
  showCloseButton,
  isResponsive,
  closeOnBackdropClick,
  children,
  footerContent,
  onClose,
}) => {
  const modalRef = useRef<HTMLDialogElement | null>(null);

  const openModal = () => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

  const closeModal = () => {
    if (modalRef.current) {
      modalRef.current.close();
    }
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      <button className='btn' onClick={openModal}>
        Open Modal
      </button>
      <dialog
        ref={modalRef}
        className={clsx(
          'modal',
          modalStyles({ position, isOpen, isResponsive }),
        )}
      >
        <div className='modal-box'>
          {children}
          <div className='modal-action'>
            <form method='dialog'>
              {showCloseButton && (
                <button className='btn btn-circle btn-ghost btn-sm absolute right-2 top-2'>
                  ✕
                </button>
              )}
              {footerContent}
            </form>
          </div>
        </div>
        {closeOnBackdropClick && (
          <label className='modal-backdrop' onClick={closeModal}>
            Close
          </label>
        )}
      </dialog>
    </>
  );
};

export default Modal;
