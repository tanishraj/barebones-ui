import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import clsx from 'clsx';

const breadcrumbVariants = cva('breadcrumbs', {
  variants: {
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
    },
  },
  defaultVariants: {
    size: 'sm',
  },
});

export interface BreadcrumbsItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

export interface BreadcrumbsProps
  extends VariantProps<typeof breadcrumbVariants> {
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
          <li key={index}>
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
