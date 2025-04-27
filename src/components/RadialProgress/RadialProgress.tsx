import { ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';

export interface RadialProgressProps extends ComponentPropsWithoutRef<'div'> {
  value: number;
  size?: string;
  thickness?: string;
  color?: string;
  bgColor?: string;
  borderColor?: string;
  borderWidth?: string;
}

export const RadialProgress = ({
  value,
  size,
  thickness,
  color,
  bgColor,
  borderColor,
  borderWidth,
  className,
  ...props
}: RadialProgressProps) => {
  return (
    <div
      className={clsx(
        'radial-progress',
        color && `text-${color}`,
        bgColor && `bg-${bgColor}`,
        borderColor && `border-${borderColor}`,
        borderWidth && `border-${borderWidth}`,
        className,
      )}
      style={{
        '--value': value,
        '--size': size,
        '--thickness': thickness,
      }}
      role='progressbar'
      aria-valuenow={value}
      {...props}
    >
      {value}%
    </div>
  );
};
