import { VariantProps } from 'class-variance-authority';
import { ReactNode } from 'react';

import { buttonStyles } from './Button.styles';

export type ButtonVariant = VariantProps<typeof buttonStyles>['variant'];
export type ButtonSize = VariantProps<typeof buttonStyles>['size'];
export type ButtonOutline = VariantProps<typeof buttonStyles>['outline'];
export type ButtonLayout = VariantProps<typeof buttonStyles>['layout'];
export type ButtonIconPosition = VariantProps<
  typeof buttonStyles
>['iconPosition'];

export interface ButtonProps extends VariantProps<typeof buttonStyles> {
  icon?: ReactNode;
  disabled?: boolean;
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
}
