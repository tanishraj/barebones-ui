import clsx from 'clsx';
import { cva, VariantProps } from 'class-variance-authority';

import { MenuItems } from './Dropdown';

interface DropdownMenuProps extends VariantProps<typeof dropdownMenuStyles> {
  items: MenuItems[];
  menuClassName?: string;
}

const dropdownMenuStyles = cva(
  'menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow',
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
}: DropdownMenuProps) => {
  return (
    <ul
      className={clsx(
        'menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow',
        dropdownMenuStyles({ isVisible: true }),
        menuClassName,
      )}
    >
      {items.map(item => (
        <li key={item.label}>
          <a onClick={item.onClick}>{item.label}</a>
        </li>
      ))}
    </ul>
  );
};
