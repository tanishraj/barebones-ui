import { VariantProps } from 'class-variance-authority';
import { FC, HTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

import { badgeStyles } from './Badge.styles';

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeStyles> {
  children: ReactNode;
}

export const Badge: FC<BadgeProps> = ({
  children,
  variant,
  size,
  outline,
  className,
  softColor,
}) => {
  const badgeClassName = clsx(
    badgeStyles({ variant, size, outline, softColor }),
    className,
  );

  return <span className={badgeClassName}>{children}</span>;
};
