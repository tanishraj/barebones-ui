import { VariantProps } from 'class-variance-authority';

import { progressStyles } from './Progress.styles';

export type ProgressVariant = NonNullable<
  VariantProps<typeof progressStyles>['variant']
>;
