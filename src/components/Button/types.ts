import { VariantProps } from 'class-variance-authority';
import { ReactNode } from 'react';

import { buttonStyles } from './Button.styles';

export type ButtonVariant = NonNullable<
  VariantProps<typeof buttonStyles>['variant']
>;
export type ButtonSize = NonNullable<VariantProps<typeof buttonStyles>['size']>;
export type ButtonOutline = NonNullable<
  VariantProps<typeof buttonStyles>['outline']
>;
export type ButtonLayout = NonNullable<
  VariantProps<typeof buttonStyles>['layout']
>;
export type ButtonIconPosition = NonNullable<
  VariantProps<typeof buttonStyles>['iconPosition']
>;

export interface ButtonProps extends VariantProps<typeof buttonStyles> {
  icon?: ReactNode;
  disabled?: boolean;
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
}
