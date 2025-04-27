import { VariantProps } from 'class-variance-authority';

import { linkVariants } from './Link.styles';

export type LinkVariants = NonNullable<
  VariantProps<typeof linkVariants>['variant']
>;
