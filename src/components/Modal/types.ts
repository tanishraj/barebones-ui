import { VariantProps } from 'class-variance-authority';
import { ReactNode } from 'react';

import { modalStyles } from './Modal.styles';

export type ModalPosition = NonNullable<
  VariantProps<typeof modalStyles>['position']
>;
export type ModalSize = NonNullable<VariantProps<typeof modalStyles>['size']>;

export interface ModalProps extends VariantProps<typeof modalStyles> {
  closeOnBackdropClick?: boolean;
  closeButton?: boolean | ReactNode;
  children?: ReactNode;
  footer?: boolean | ReactNode;
  onOpen?: () => void;
  onClose?: () => void;
}
