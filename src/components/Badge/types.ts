import { VariantProps } from 'class-variance-authority';

import { badgeStyles } from './Badge.styles';

export type BadgeVariant = NonNullable<
  VariantProps<typeof badgeStyles>['variant']
>;
export type BadgeSize = NonNullable<VariantProps<typeof badgeStyles>['size']>;
