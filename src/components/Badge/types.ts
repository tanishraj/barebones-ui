import { VariantProps } from 'class-variance-authority';

import { badgeStyles } from './Badge.styles';

export type BadgeVariant = VariantProps<typeof badgeStyles>['variant'];
export type BadgeSize = VariantProps<typeof badgeStyles>['size'];
