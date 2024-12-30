import { VariantProps } from 'class-variance-authority';
import { ReactNode } from 'react';

import { modalStyles } from './variants';

export interface ModalProps extends VariantProps<typeof modalStyles> {
  clickOutsideToClose?: boolean;
  closeIcon?: boolean | ReactNode;
  footer?: ReactNode;
  children?: ReactNode;
}
