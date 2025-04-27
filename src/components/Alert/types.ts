import { VariantProps } from 'class-variance-authority';

import { alertStyles } from './Alert.styles';

export type AlertVariant = VariantProps<typeof alertStyles>['variant'];
export type AlertBorderStyle = VariantProps<typeof alertStyles>['borderStyle'];
export type AlertDirection = VariantProps<typeof alertStyles>['direction'];
