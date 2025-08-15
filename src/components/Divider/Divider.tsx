import React from 'react';
import clsx from 'clsx';

import { DividerProps } from './types';
import { dividerStyles } from './Divider.styles';

export const Divider: React.FC<DividerProps> = ({
  children,
  orientation = 'vertical',
  variant = 'default',
  position = 'center',
  className = '',
}) => {
  return (
    <div
      className={clsx(
        dividerStyles({
          orientation,
          variant,
          position,
        }),
        className,
      )}
    >
      {children}
    </div>
  );
};
