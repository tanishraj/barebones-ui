import { VariantProps } from 'class-variance-authority';

import { tooltipStyles } from './Tooltip.styles';

export type TooltipVariant = VariantProps<typeof tooltipStyles>['variant'];
export type TooltipPosition = VariantProps<typeof tooltipStyles>['position'];
