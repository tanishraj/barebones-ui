import { FC } from 'react';
import clsx from 'clsx';

import { countdownStyles } from './Countdown.styles';
import { CountdownStylesProps } from './types';

interface CountdownProps extends CountdownStylesProps {
  value: number;
}

export const Countdown: FC<CountdownProps> = ({ value, size = 'sm' }) => {
  const countdownClassName = clsx('countdown', countdownStyles({ size }));
  return (
    <span className={countdownClassName}>
      <span style={{ '--value': value } as React.CSSProperties}>{value}</span>
    </span>
  );
};
