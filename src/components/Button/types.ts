import { VariantProps } from 'class-variance-authority';
import { ReactNode } from 'react';

import { buttonStyles } from './Button.styles';

export interface ButtonProps extends VariantProps<typeof buttonStyles> {
  icon?: ReactNode;
  disabled?: boolean;
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
}
