import { VariantProps } from 'class-variance-authority';

import { modalStyles } from './variants';

export interface ModalProps extends VariantProps<typeof modalStyles> {
  content?: React.ReactNode;
  onClose?: () => void;
  closeButton?: boolean;
}
