import { VariantProps } from 'class-variance-authority';

import { statsStyles } from './Stat.styles';

export type StatDirection = VariantProps<typeof statsStyles>['direction'];
