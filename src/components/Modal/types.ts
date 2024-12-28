import { VariantProps } from 'class-variance-authority';

import { modalStyles } from './variants';

export interface ModalProps extends VariantProps<typeof modalStyles> {
  clickOutsideToClose?: boolean;
}
