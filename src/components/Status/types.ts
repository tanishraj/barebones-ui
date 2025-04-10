import { VariantProps } from 'class-variance-authority';

import { statusStyles } from './Status.styles';

export type StatusVariant = VariantProps<typeof statusStyles>['variant'];
export type StatusSize = VariantProps<typeof statusStyles>['size'];
