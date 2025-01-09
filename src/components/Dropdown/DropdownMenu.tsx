import clsx from 'clsx';
import { cva, VariantProps } from 'class-variance-authority';

import { DropdownMenuItem } from './types';

interface DropdownMenuProps extends VariantProps<typeof dropdownMenuStyles> {
  items: DropdownMenuItem[];
  menuClassName?: string;
  tabIndex?: number;
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
  tabIndex,
}: DropdownMenuProps) => {
  return (
    <ul
      tabIndex={tabIndex}
      role='menu'
      className={clsx(
        'menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow',
        dropdownMenuStyles({ isVisible: true }),
        menuClassName,
      )}
    >
      {items.map((item, index) => (
        <li key={index}>
          <a onClick={item.onClick}>{item.label}</a>
        </li>
      ))}
    </ul>
  );
};
