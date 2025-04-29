import { VariantProps } from 'class-variance-authority';

import { skeletonVariants } from './Skeleton.styles';

export type SkeletonVariant = VariantProps<typeof skeletonVariants>['variant'];
