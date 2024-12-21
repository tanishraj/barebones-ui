import React from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import clsx from 'clsx';

import { DropdownMenu } from './DropdownMenu';

export interface MenuItems {
  label: string;
  onClick?: () => void;
  className?: string;
}

export interface DropdownProps extends VariantProps<typeof dropdownStyles> {
  buttonLabel: React.ReactNode;
  items?: MenuItems[];
  children?: React.ReactNode;
  triggerClassName?: string;
  menuClassName?: string;
  behavior?: 'toggle' | 'hover' | 'forceOpen' | 'clickOutsideClose';
}

const dropdownStyles = cva('dropdown', {
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
    behavior: {
      toggle: 'dropdown-toggle',
      hover: 'dropdown-hover',
      forceOpen: 'dropdown-open',
      clickOutsideClose: 'dropdown-click',
    },
  },
  defaultVariants: {
    position: 'bottom',
    alignment: 'end',
  },
});

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
    <>
      {behavior === 'toggle' ? (
        <details
          className={clsx('dropdown', dropdownStyles({ position, alignment }))}
          data-testid='dropdown'
        >
          <summary role='button' className={clsx('btn m-1', triggerClassName)}>
            {buttonLabel}
          </summary>
          {children
            ? children
            : items &&
              items.length > 0 && (
                <DropdownMenu items={items} menuClassName={menuClassName} />
              )}
        </details>
      ) : (
        <div
          className={clsx('dropdown', dropdownStyles({ position, alignment }))}
          data-testid='dropdown'
        >
          <div role='button' className={clsx('btn m-1', triggerClassName)}>
            {buttonLabel}
          </div>
          {children
            ? children
            : items &&
              items.length > 0 && (
                <DropdownMenu items={items} menuClassName={menuClassName} />
              )}
        </div>
      )}
    </>
  );
};

export default Dropdown;
