import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../utils'; // Assuming you have a cn utility that uses clsx

// Stats container variants
const statsVariants = cva('stats', {
  variants: {
    direction: {
      horizontal: 'stats-horizontal',
      vertical: 'stats-vertical',
    },
    shadow: {
      true: 'shadow',
      false: '',
    },
  },
  defaultVariants: {
    direction: 'horizontal',
    shadow: false,
  },
});

export interface StatsProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statsVariants> {}

export const Stats = React.forwardRef<HTMLDivElement, StatsProps>(
  ({ className, direction, shadow, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(statsVariants({ direction, shadow }), className)}
        {...props}
      />
    );
  },
);
Stats.displayName = 'Stats';

// Individual stat item
export const Stat = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn('stat', className)} {...props} />;
});
Stat.displayName = 'Stat';

// Stat title component
export const StatTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn('stat-title', className)} {...props} />;
});
StatTitle.displayName = 'StatTitle';

// Stat value component
export const StatValue = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn('stat-value', className)} {...props} />;
});
StatValue.displayName = 'StatValue';

// Stat description component
export const StatDesc = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn('stat-desc', className)} {...props} />;
});
StatDesc.displayName = 'StatDesc';

// Stat figure component for icons/images
export const StatFigure = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn('stat-figure', className)} {...props} />;
});
StatFigure.displayName = 'StatFigure';

// Stat actions component for buttons/inputs
export const StatActions = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn('stat-actions', className)} {...props} />;
});
StatActions.displayName = 'StatActions';

export { statsVariants };
