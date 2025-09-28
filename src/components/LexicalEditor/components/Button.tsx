import React from 'react';

import { cn } from '../../../utils';

interface ButtonProps {
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
  label: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'ghost' | 'solid' | 'outline';
  className?: string;
  children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  active,
  disabled,
  onClick,
  icon,
  label,
  size = 'sm',
  variant = 'ghost',
  className,
  children,
}) => {
  return (
    <button
      type='button'
      className={cn(
        'btn',
        size === 'sm' && 'btn-sm',
        size === 'md' && 'btn-md',
        size === 'lg' && 'btn-lg',
        variant === 'ghost' && 'btn-ghost',
        variant === 'solid' && 'btn-primary',
        variant === 'outline' && 'btn-outline',
        active && 'btn-active',
        disabled && 'btn-disabled',
        className,
      )}
      disabled={disabled}
      onClick={onClick}
      title={label}
      aria-label={label}
      aria-pressed={active}
    >
      {icon}
      {children}
    </button>
  );
};
