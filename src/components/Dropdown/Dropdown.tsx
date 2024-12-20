import React from 'react';
import { cva, VariantProps } from 'class-variance-authority';

interface DropdownItem {
  label: string;
  onClick?: () => void;
  className?: string;
}

export interface DropdownProps
  extends VariantProps<typeof dropdownClasses>,
    VariantProps<typeof dropdownMenuClasses> {
  items?: DropdownItem[];
  children?: React.ReactNode;
  triggerClassName?: string;
  menuClassName?: string;
  behavior?: 'toggle' | 'hover' | 'forceOpen' | 'clickOutsideClose';
}

const dropdownClasses = cva('dropdown', {
  variants: {
    position: {
      top: 'dropdown-top',
      bottom: 'dropdown-bottom',
      left: 'dropdown-left',
      right: 'dropdown-right',
    },
    alignment: {
      start: 'dropdown-start',
      end: 'dropdown-end',
    },
  },
  defaultVariants: {
    position: 'bottom',
    alignment: 'end',
  },
});

const dropdownMenuClasses = cva(
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

const Dropdown: React.FC<DropdownProps> = ({
  buttonLabel,
  position,
  alignment,
  items,
  children,
  triggerClassName = '',
  menuClassName = '',
  behavior = 'toggle',
}) => {
  return (
    <div className='dropdown'>
      <div tabIndex={0} role='button' className='btn m-1'>
        Click
      </div>
      {items && items.length > 0 && (
        <ul
          tabIndex={0}
          className='menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow'
        >
          {items.map((item, index) => (
            <li key={index}>
              <a onClick={item.onClick}>{item.label}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
