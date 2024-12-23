import { VariantProps } from 'class-variance-authority';

import { buttonStyles } from './variants';

export interface ButtonProps extends VariantProps<typeof buttonStyles> {
  icon?: React.ReactNode;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}
