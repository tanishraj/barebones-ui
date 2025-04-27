import { VariantProps } from 'class-variance-authority';

import { listColVariants } from './List.styles';

export type ListColVariants = NonNullable<VariantProps<typeof listColVariants>>;
