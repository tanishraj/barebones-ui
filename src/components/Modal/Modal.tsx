import React from 'react';
import clsx from 'clsx';

import { ModalProps } from './types';
import { modalStyles } from './variants';

const Modal: React.FC<ModalProps> = ({
  isOpen,
  size,
  onClose,
  showCloseButton = true,
  closeOnBackdropClick = true,
  footer,
  children,
}) => {
  return (
    <dialog
      className={clsx('modal', modalStyles({ isOpen }))}
      onClick={closeOnBackdropClick ? onClose : undefined}
    >
      <div className={clsx(modalStyles({ size }))}>
        {showCloseButton && (
          <button
            onClick={onClose}
            className='absolute right-2 top-2 text-gray-400 hover:text-gray-600'
            aria-label='Close Modal'
          >
            ✕
          </button>
        )}
        <div className='modal-content'>{children}</div>
        {footer && <div className='modal-action'>{footer}</div>}
      </div>
    </dialog>
  );
};

export default Modal;
