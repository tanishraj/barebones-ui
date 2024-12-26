import { VariantProps } from 'class-variance-authority';

import { modalStyles } from './variants';

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
