import { VariantProps } from 'class-variance-authority';
import { ReactNode } from 'react';

import { modalStyles } from './variants';

export interface ModalProps extends VariantProps<typeof modalStyles> {
  closeOnBackdropClick?: boolean;
  showCloseButton?: boolean | ReactNode;
  footerContent?: ReactNode;
  children?: ReactNode;
  onClose?: () => void;
}
