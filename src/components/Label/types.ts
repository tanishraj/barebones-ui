import { VariantProps } from 'class-variance-authority';

import { labelContainerStyles, labelStyles } from './Label.styles';

export type LabelPosition = 'left' | 'right';
export type LabelType = VariantProps<typeof labelContainerStyles>['type'];
export type LabelSize = VariantProps<typeof labelStyles>['size'];
