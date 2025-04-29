import { forwardRef } from 'react';
import { VariantProps } from 'class-variance-authority';

import { skeletonVariants } from './Skeleton.styles';
import { cn } from '../../utils';

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {}

const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant, ...props }, ref) => {
    const skeletonClassName = cn(skeletonVariants({ variant }), className);

    return <div ref={ref} className={skeletonClassName} {...props} />;
  },
);

Skeleton.displayName = 'Skeleton';

export { Skeleton };
