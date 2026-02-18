import clsx from 'clsx';
import { cva, VariantProps } from 'class-variance-authority';

import { DropdownMenuItem } from './types';

interface DropdownMenuProps extends VariantProps<typeof dropdownMenuStyles> {
  items: DropdownMenuItem[];
  menuClassName?: string;
  tabIndex?: number;
}

const dropdownMenuStyles = cva(
  'dropdown-content menu z-1 w-52 rounded-box bg-base-100 p-2 shadow-sm',
  {
    variants: {
      isVisible: {
        true: 'scale-100',
        false: 'hidden',
      },
    },
  },
);

export const DropdownMenu = ({
  items,
  menuClassName = '',
  tabIndex,
}: DropdownMenuProps) => {
  const getItemKey = (item: DropdownMenuItem) => {
    if (item.key) return item.key;
    if (typeof item.label === 'string' || typeof item.label === 'number') {
      return String(item.label);
    }
    return `menu-item-${item.className ?? ''}-${item.disabled ? 'disabled' : 'enabled'}`;
  };

  return (
    <ul
      tabIndex={tabIndex}
      role='menu'
      className={clsx(
        'dropdown-content menu z-1 w-52 rounded-box bg-base-100 p-2 shadow-sm',
        dropdownMenuStyles({ isVisible: true }),
        menuClassName,
      )}
    >
      {items.map(item => (
        <li key={getItemKey(item)}>
          <a onClick={item.onClick}>{item.label}</a>
        </li>
      ))}
    </ul>
  );
};
