import React from 'react';

import { cn } from '../../utils';
import { IndicatorProps, IndicatorItemProps } from './types';
import { indicatorStyles, indicatorItemStyles } from './Indicator.styles';

export const Indicator: React.FC<IndicatorProps> = ({
  children,
  className = '',
}) => {
  return <div className={cn(indicatorStyles(), className)}>{children}</div>;
};

export const IndicatorItem: React.FC<IndicatorItemProps> = ({
  children,
  horizontal = 'end',
  vertical = 'top',
  className = '',
}) => {
  return (
    <span
      className={cn(
        indicatorItemStyles({
          horizontal,
          vertical,
        }),
        className,
      )}
    >
      {children}
    </span>
  );
};
