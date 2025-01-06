import React from 'react';
import { cva } from 'class-variance-authority';
import clsx from 'clsx';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  showCloseButton?: boolean;
  closeOnBackdropClick?: boolean;
  footerContent?: React.ReactNode;
  children?: React.ReactNode;
};

const modalBoxStyles = cva('modal-box', {
  variants: {
    isOpen: {
      true: 'translate-y-0 scale-100',
      false: 'scale-90',
    },
  },
});

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  showCloseButton = true,
  closeOnBackdropClick = true,
  footerContent,
  children,
}) => {
  const handleBackdropClick = () => {
    if (closeOnBackdropClick) onClose();
  };

  return (
    <dialog
      className={clsx('modal', { 'modal-open': isOpen })}
      onClick={handleBackdropClick}
      aria-hidden={!isOpen}
    >
      <div
        className={modalBoxStyles({ isOpen })}
        onClick={e => e.stopPropagation()} // Prevent backdrop click when interacting with modal
      >
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
        {footerContent && <div className='modal-action'>{footerContent}</div>}
      </div>
    </dialog>
  );
};

export default Modal;
