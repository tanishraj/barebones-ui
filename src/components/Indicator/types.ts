import { ReactNode } from 'react';
import { VariantProps } from 'class-variance-authority';

import { indicatorStyles, indicatorItemStyles } from './Indicator.styles';

export type IndicatorHorizontal = NonNullable<
  VariantProps<typeof indicatorItemStyles>['horizontal']
>;

export type IndicatorVertical = NonNullable<
  VariantProps<typeof indicatorItemStyles>['vertical']
>;

export interface IndicatorProps extends VariantProps<typeof indicatorStyles> {
  children: ReactNode;
  className?: string;
}

export interface IndicatorItemProps extends VariantProps<
  typeof indicatorItemStyles
> {
  children?: ReactNode;
  className?: string;
}
