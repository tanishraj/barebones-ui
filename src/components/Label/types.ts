import { VariantProps } from 'class-variance-authority';

import { labelContainerStyles } from './Label.styles';

export type LabelPosition = 'left' | 'right';
export type LabelType = VariantProps<typeof labelContainerStyles>['type'];
