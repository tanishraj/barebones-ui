import { cn } from '../../utils';

export interface BreadcrumbsItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbsItem[];
  className?: string;
}

export const Breadcrumbs = ({ items, className }: BreadcrumbsProps) => {
  const breadcrumbClassName = cn('breadcrumbs', className);

  return (
    <nav aria-label='Breadcrumb' className={breadcrumbClassName}>
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
