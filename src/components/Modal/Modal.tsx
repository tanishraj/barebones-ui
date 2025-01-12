import React, { useCallback } from 'react';
import clsx from 'clsx';

import { ModalProps } from './types';
import { modalStyles } from './variants';

const Modal: React.FC<ModalProps> = ({
  isOpen,
  size,
  position = 'center',
  closeButton,
  closeOnBackdropClick,
  footer,
  children,
  onOpen,
  onClose,
}) => {
  const modalRef = React.useRef<HTMLInputElement>(null);

  const openModal = useCallback(() => {
    if (modalRef.current) {
      modalRef.current.checked = true;
      onOpen?.();
    }
  }, [onOpen]);

  const closeModal = useCallback(() => {
    if (modalRef.current) {
      modalRef.current.checked = false;
      onClose?.();
    }
  }, [onClose]);

  React.useEffect(() => {
    if (isOpen) {
      openModal();
    } else {
      closeModal();
    }
  }, [closeModal, isOpen, openModal]);

  return (
    <>
      <input type='checkbox' ref={modalRef} className='modal-toggle' />
      <div className={clsx('modal', modalStyles({ position }))} role='dialog'>
        <div
          className={clsx(
            'modal-box',
            modalStyles({ size }),
            position !== 'center' && modalStyles({ size, position }),
          )}
        >
          {children}

          {typeof closeButton === 'boolean' && closeButton ? (
            <form method='dialog'>
              <button
                className='btn btn-circle btn-ghost btn-sm absolute right-2 top-2'
                onClick={closeModal}
              >
                ✕
              </button>
            </form>
          ) : (
            <>{closeButton}</>
          )}

          <div className='modal-action'>
            {typeof footer === 'boolean' ? (
              <button className='btn' onClick={closeModal}>
                Close
              </button>
            ) : (
              <>{footer}</>
            )}
          </div>
        </div>

        {closeOnBackdropClick && (
          <label className='modal-backdrop' onClick={closeModal}>
            Close
          </label>
        )}
      </div>
    </>
  );
};

export default Modal;
