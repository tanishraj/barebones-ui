import { VariantProps } from 'class-variance-authority';

import { toggleStyles } from './Toggle.styles';

export type ToggleSize = VariantProps<typeof toggleStyles>['size'];
export type ToggleVariant = VariantProps<typeof toggleStyles>['variant'];
