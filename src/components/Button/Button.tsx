import React from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import clsx from 'clsx';

export interface ButtonProps extends VariantProps<typeof buttonClasses> {
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const buttonClasses = cva('btn', {
  variants: {
    variant: {
      primary: 'btn-primary',
      secondary: 'btn-secondary',
      accent: 'btn-accent',
      neutral: 'btn-neutral',
      info: 'btn-info',
      success: 'btn-success',
      warning: 'btn-warning',
      error: 'btn-error',
      ghost: 'btn-ghost',
      link: 'btn-link',
      outline: 'btn-outline',
    },
    size: {
      xs: 'btn-xs',
      sm: 'btn-sm',
      md: 'btn-md',
      lg: 'btn-lg',
    },
    disabled: {
      true: 'btn-disabled',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const Button: React.FC<ButtonProps> = ({
  variant,
  size,
  icon,
  iconPosition = 'left',
  disabled = false,
  children,
  className = '',
  onClick,
}) => {
  return (
    <button
      className={clsx(
        buttonClasses({ variant, size, disabled: disabled }),
        icon && iconPosition === 'right' ? 'flex-row-reverse' : 'flex-row',
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

export default Button;
