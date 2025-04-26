import { VariantProps } from 'class-variance-authority';

import { linkVariants } from './Link.styles';

export type LinkVariants = VariantProps<typeof linkVariants>['variant'];
