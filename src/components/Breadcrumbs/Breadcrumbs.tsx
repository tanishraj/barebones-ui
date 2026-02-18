import React from 'react';
import { type VariantProps } from 'class-variance-authority';
import clsx from 'clsx';

import { breadcrumbVariants } from './Breadcrumbs.styles';

export interface BreadcrumbsItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

export interface BreadcrumbsProps extends VariantProps<
  typeof breadcrumbVariants
> {
  items: BreadcrumbsItem[];
  maxWidth?: string;
  className?: string;
}

const Breadcrumbs = ({
  items,
  size,
  maxWidth,
  className,
}: BreadcrumbsProps) => {
  return (
    <nav className={clsx(breadcrumbVariants({ size, className }), maxWidth)}>
      <ul>
        {items.map((item, index) => (
          <li key={item.label}>
            {index < items.length - 1 ? (
              <a
                href={item.href}
                className={clsx(
                  'inline-flex items-center gap-2',
                  maxWidth && 'truncate',
                )}
              >
                {item.icon && item.icon}
                {item.label}
              </a>
            ) : (
              <span
                className={clsx(
                  'inline-flex items-center gap-2',
                  maxWidth && 'truncate',
                )}
              >
                {item.icon && item.icon}
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
