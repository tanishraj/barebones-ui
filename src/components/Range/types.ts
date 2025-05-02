import { VariantProps } from 'class-variance-authority';

import { rangeStyles } from './Range.styles';

export type RangeSize = NonNullable<VariantProps<typeof rangeStyles>['size']>;
export type RangeVariant = NonNullable<
  VariantProps<typeof rangeStyles>['variant']
>;
