import React from 'react';
import clsx from 'clsx';

import { ButtonProps } from './types';
import { buttonStyles } from './Button.styles';

export const Button: React.FC<ButtonProps> = ({
  variant,
  size,
  icon,
  iconPosition,
  disabled,
  outline,
  children,
  className = '',
  onClick,
}) => {
  return (
    <button
      className={clsx(
        buttonStyles({
          variant,
          size,
          iconPosition,
          outline,
          disabled: disabled,
        }),
        className,
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {icon && <span>{icon}</span>}
      <span>{children}</span>
    </button>
  );
};
