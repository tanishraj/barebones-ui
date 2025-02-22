import { VariantProps } from 'class-variance-authority';
import { FC, ReactNode } from 'react';
import clsx from 'clsx';

import { badgeStyles } from './Badge.styles';

export interface BadgeProps extends VariantProps<typeof badgeStyles> {
  children: ReactNode;
}

export const Badge: FC<BadgeProps> = ({ children, variant, size, outline }) => {
  const badgeClassName = clsx('badge', badgeStyles({ variant, size, outline }));

  return <span className={badgeClassName}>{children}</span>;
};
