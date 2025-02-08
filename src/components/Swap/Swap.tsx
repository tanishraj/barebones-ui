import clsx from 'clsx';

import { swapStyles } from './Swap.styles';
import { SwapProps } from './types';

export const Swap = ({
  animationType,
  children,
  isActive,
  className,
  value,
  onClick,
  ...rest
}: SwapProps) => {
  const [firstChild, secondChild] = children || [];

  return (
    <label
      className={clsx(
        'swap',
        swapStyles({ animationType, isActive }),
        className,
      )}
    >
      {!isActive && (
        <input
          type='checkbox'
          className={clsx('', { 'theme-controller': value })}
          value={value}
          hidden
          onChange={onClick}
          {...rest}
        />
      )}
      <div className='swap-on'>{firstChild}</div>
      <div className='swap-off'>{secondChild}</div>
    </label>
  );
};
