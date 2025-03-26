import React, { forwardRef, HTMLAttributes } from 'react';
import { type VariantProps } from 'class-variance-authority';

import { cn } from '../../utils';
import { statsStyles } from './Stat.styles';

export interface StatsProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statsStyles> {}

export const Stats = forwardRef<HTMLDivElement, StatsProps>(
  ({ className, variant, direction, shadow, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(statsStyles({ direction, shadow, variant }), className)}
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

export { statsStyles };
