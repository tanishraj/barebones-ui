import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';
import { cva, VariantProps } from 'class-variance-authority';

export interface ModalProps extends VariantProps<typeof modalStyles> {
  title?: string;
  content?: React.ReactNode;
  triggerLabel?: string;
  isOpen?: boolean;
  onClose?: () => void;
  closeOnBackdropClick?: boolean;
  hasCloseButton?: boolean;
  triggerClassName?: string;
  modalClassName?: string;
}

const modalStyles = cva('modal', {
  variants: {
    size: {
      small: 'max-w-md',
      medium: 'max-w-lg',
      large: 'max-w-2xl',
      full: 'w-full',
    },
    responsive: {
      true: 'modal-bottom sm:modal-middle',
      false: '',
    },
  },
  defaultVariants: {
    size: 'medium',
    responsive: false,
  },
});

const Modal: React.FC<ModalProps> = ({
  title,
  content,
  triggerLabel,
  isOpen = false,
  onClose,
  closeOnBackdropClick = true,
  hasCloseButton = false,
  size,
  responsive,
  triggerClassName,
  modalClassName,
}) => {
  const modalRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (modalRef.current && isOpen) {
      modalRef.current.showModal();
    } else if (modalRef.current && !isOpen) {
      modalRef.current.close();
    }
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnBackdropClick && e.target === modalRef.current && onClose) {
      onClose();
    }
  };

  return (
    <>
      {/* Trigger Button */}
      {triggerLabel && (
        <button
          className={clsx('btn', triggerClassName)}
          onClick={() => modalRef.current?.showModal()}
        >
          {triggerLabel}
        </button>
      )}

      {/* Modal */}
      <dialog
        ref={modalRef}
        className={clsx(modalStyles({ size, responsive }), modalClassName)}
        onClick={handleBackdropClick}
      >
        <div className='modal-box'>
          {hasCloseButton && (
            <button
              className='btn btn-circle btn-ghost btn-sm absolute right-2 top-2'
              onClick={onClose}
            >
              ✕
            </button>
          )}
          {title && <h3 className='text-lg font-bold'>{title}</h3>}
          <div className='py-4'>{content}</div>
        </div>
      </dialog>
    </>
  );
};

export default Modal;
