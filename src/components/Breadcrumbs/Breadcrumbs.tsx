import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../utils';

const breadcrumbsVariants = cva('breadcrumbs', {
  variants: {
    separator: {
      slash: '',
      chevron: '[&>li>:not(:first-child)]:before:content-[">"]',
      arrow: '[&>li>:not(:first-child)]:before:content-["→"]',
      bullet: '[&>li>:not(:first-child)]:before:content-["•"]',
    },
  },
  defaultVariants: {
    separator: 'slash',
  },
});

export interface BreadcrumbsItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps extends VariantProps<typeof breadcrumbsVariants> {
  items: BreadcrumbsItem[];
  className?: string;
}

export const Breadcrumbs = ({
  items,
  separator,
  className,
}: BreadcrumbsProps) => {
  return (
    <nav
      aria-label='Breadcrumb'
      className={cn(breadcrumbsVariants({ separator }), className)}
    >
      <ul>
        {items.map((item, index) => (
          <li key={`${item.label}`}>
            {index < items.length - 1 ? (
              <a
                href={item.href}
                className='text-sm font-medium text-neutral-500 hover:text-neutral-700'
              >
                {item.label}
              </a>
            ) : (
              <span className='text-sm font-medium text-neutral-900'>
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};
