import React from 'react';
import clsx from 'clsx';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  icon?: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-600',
  secondary:
    'bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-600',
  ghost: 'bg-transparent text-blue-500 hover:bg-blue-50',
  link: 'bg-transparent text-blue-500 underline hover:text-blue-600',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-2 py-1 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
  xl: 'px-8 py-4 text-xl',
  '2xl': 'px-10 py-5 text-2xl',
};

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
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
