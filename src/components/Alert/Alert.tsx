import { type VariantProps } from 'class-variance-authority';
import { forwardRef } from 'react';

import { cn } from '../../utils';
import { alertStyles } from './Alert.styles';

import { ErrorIcon, InfoIcon, SuccessIcon, WarningIcon } from '@/assets/icons';

interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertStyles> {
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  actions?: React.ReactNode;
}

const DEFAULT_ICONS = {
  info: InfoIcon,
  success: SuccessIcon,
  warning: WarningIcon,
  error: ErrorIcon,
};

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      className,
      variant,
      direction,
      icon,
      title,
      description,
      responsive,
      actions,
      children,
      borderStyle,
      softColor,
      ...props
    },
    ref,
  ) => {
    const defaultIcon =
      variant in DEFAULT_ICONS ? DEFAULT_ICONS[variant] : null;
    const Icon = icon || defaultIcon;

    const alertClassName = cn(
      alertStyles({
        variant,
        direction,
        responsive,
        borderStyle,
        softColor,
      }),
      className,
    );

    return (
      <div ref={ref} role='alert' className={alertClassName} {...props}>
        {(icon || defaultIcon) && (
          <div className='shrink-0'>
            <Icon />
          </div>
        )}

        <div className='flex-1'>
          {children || (
            <>
              {title && <h3 className='font-bold'>{title}</h3>}
              {description && <div className='text-xs'>{description}</div>}
            </>
          )}
        </div>

        {actions && <div className='flex gap-2'>{actions}</div>}
      </div>
    );
  },
);
