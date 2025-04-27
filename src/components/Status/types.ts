import { VariantProps } from 'class-variance-authority';

import { statusStyles } from './Status.styles';

export type StatusVariant = NonNullable<
  VariantProps<typeof statusStyles>['variant']
>;
export type StatusSize = NonNullable<VariantProps<typeof statusStyles>['size']>;
export type StatusAnimate = NonNullable<
  VariantProps<typeof statusStyles>['animate']
>;
