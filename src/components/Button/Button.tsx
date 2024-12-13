import React from 'react';
import clsx from 'clsx';

export type ButtonVariant =
  | 'default'
  | 'neutral'
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'ghost'
  | 'link'
  | 'success'
  | 'warning'
  | 'error'
  | 'info';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  icon?: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  default: 'btn',
  neutral: 'btn btn-neutral',
  primary: 'btn btn-primary',
  secondary: 'btn btn-secondary',
  accent: 'btn btn-accent',
  ghost: 'btn btn-ghost',
  link: 'btn btn-link',
  success: 'btn btn-success',
  warning: 'btn btn-warning',
  error: 'btn btn-error',
  info: 'btn btn-info',
};

const sizeClasses: Record<ButtonSize, string> = {
  xs: 'btn btn-xs',
  sm: 'btn btn-sm',
  md: 'btn',
  lg: 'btn btn-lg',
};

const Button: React.FC<ButtonProps> = ({
  variant = 'default',
  size = 'md',
  disabled = false,
  icon,
  children,
  className,
  ...props
}) => {
  const classes = clsx(
    'flex items-center justify-center rounded border-0 focus:outline-none focus:ring-1 focus:ring-offset-2',
    variantClasses[variant],
    sizeClasses[size],
    {
      'opacity-50 cursor-not-allowed': disabled,
    },
    className,
  );

  return (
    <button className={classes} disabled={disabled} {...props}>
      {icon && (
        <span className='mr-2' data-testid='icon'>
          {icon}
        </span>
      )}
      {children}
    </button>
  );
};

export default Button;
