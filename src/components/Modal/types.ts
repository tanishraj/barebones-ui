import { VariantProps } from 'class-variance-authority';
import { ReactNode } from 'react';

import { modalStyles } from './variants';

export type ModalPosition = VariantProps<typeof modalStyles>['position'];
export type ModalSize = VariantProps<typeof modalStyles>['size'];
export type ModalOpen = VariantProps<typeof modalStyles>['isOpen'];
export type ModalResponsive = VariantProps<typeof modalStyles>['isResponsive'];

export interface ModalProps extends VariantProps<typeof modalStyles> {
  closeOnBackdropClick?: boolean;
  showCloseButton?: boolean | ReactNode;
  footerContent?: ReactNode;
  children?: ReactNode;
  open?: () => void;
  close?: () => void;
}
