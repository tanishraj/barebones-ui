import { VariantProps } from 'class-variance-authority';

import { alertStyles } from './Alert.styles';

export type AlertVariant = NonNullable<
  VariantProps<typeof alertStyles>['variant']
>;
export type AlertBorderStyle = NonNullable<
  VariantProps<typeof alertStyles>['borderStyle']
>;
export type AlertDirection = NonNullable<
  VariantProps<typeof alertStyles>['direction']
>;
