import clsx from 'clsx';

import { swapStyles } from './Swap.styles';
import { SwapProps } from './types';

export const Swap = ({
  animationType,
  children,
  isActive,
  className,
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
      <input
        type='checkbox'
        className='theme-controller'
        hidden
        onChange={onClick}
        {...rest}
      />
      <div className='swap-on'>{firstChild}</div>
      <div className='swap-off'>{secondChild}</div>
    </label>
  );
};
