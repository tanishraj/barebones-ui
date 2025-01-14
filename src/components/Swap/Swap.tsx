import clsx from 'clsx';

import { swapStyles } from './Swap.styles';
import { SwapProps } from './types';

export const Swap = ({
  animationType,
  children,
  active,
  className,
}: SwapProps) => {
  const [firstChild, secondChild] = children || [];

  return (
    <label
      className={clsx('swap', swapStyles({ animationType, active }), className)}
    >
      {!active && <input type='checkbox' hidden />}
      <div className='swap-on'>{firstChild}</div>
      <div className='swap-off'>{secondChild}</div>
    </label>
  );
};
