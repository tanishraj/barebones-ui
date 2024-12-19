import React, { useState, useEffect } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import clsx from 'clsx';

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
  position,
  alignment,
  items,
  children,
  triggerClassName = '',
  menuClassName = '',
  behavior = 'toggle',
}) => {
  const [isOpen, setIsOpen] = useState(behavior === 'forceOpen');

  const handleToggle = () => {
    if (behavior === 'toggle') {
      setIsOpen(prev => !prev);
    }
  };

  const handleClose = () => {
    if (behavior === 'clickOutsideClose' && isOpen) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (behavior === 'clickOutsideClose') {
      document.addEventListener('click', handleClose);
    }
    return () => document.removeEventListener('click', handleClose);
  }, [isOpen, behavior]);

  return (
    <div className={dropdownClasses({ position, alignment })}>
      {/* Trigger */}
      <div
        tabIndex={0}
        role='button'
        className={clsx('btn m-1', triggerClassName)}
        onClick={behavior === 'toggle' ? handleToggle : undefined}
      >
        Trigger
      </div>

      {/* Dropdown Menu */}
      <ul
        className={clsx(
          dropdownMenuClasses({
            isVisible: isOpen || behavior === 'forceOpen',
          }),
          menuClassName,
        )}
      >
        {items
          ? items.map((item, index) => (
              <li key={index}>
                <a
                  className={clsx('cursor-pointer', item.className)}
                  onClick={item.onClick}
                >
                  {item.label}
                </a>
              </li>
            ))
          : children}
      </ul>
    </div>
  );
};

export default Dropdown;
