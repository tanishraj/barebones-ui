import { ReactNode } from 'react';
import { VariantProps } from 'class-variance-authority';

import { dividerStyles } from './Divider.styles';

export type DividerOrientation = NonNullable<
  VariantProps<typeof dividerStyles>['orientation']
>;
export type DividerVariant = NonNullable<
  VariantProps<typeof dividerStyles>['variant']
>;
export type DividerPosition = NonNullable<
  VariantProps<typeof dividerStyles>['position']
>;

export interface DividerProps extends VariantProps<typeof dividerStyles> {
  children?: ReactNode;
  className?: string;
}
