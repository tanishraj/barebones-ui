import { VariantProps } from 'class-variance-authority';

import { radioStyles } from './Radio.styles';

export type RadioSize = VariantProps<typeof radioStyles>['size'];
export type RadioVariant = VariantProps<typeof radioStyles>['variant'];
