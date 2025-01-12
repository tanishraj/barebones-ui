import { VariantProps } from 'class-variance-authority';
import { ReactNode } from 'react';

import { modalStyles } from './variants';

export type ModalPosition = VariantProps<typeof modalStyles>['position'];
export type ModalSize = VariantProps<typeof modalStyles>['size'];
export type ModalOpen = VariantProps<typeof modalStyles>['isOpen'];

export interface ModalProps extends VariantProps<typeof modalStyles> {
  closeOnBackdropClick?: boolean;
  closeButton?: boolean | ReactNode;
  children?: ReactNode;
  footer?: boolean | ReactNode;
  onOpen?: () => void;
  onClose?: () => void;
}
