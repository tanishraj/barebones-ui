import { VariantProps } from 'class-variance-authority';

import { statsStyles } from './Stat.styles';

export type StatDirection = NonNullable<
  VariantProps<typeof statsStyles>['direction']
>;
