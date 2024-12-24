import React from 'react';
import clsx from 'clsx';

import { DropdownMenu } from './DropdownMenu';
import { DropdownProps } from './types';
import { dropdownStyles } from './variants';

const Dropdown: React.FC<DropdownProps> = ({
  label,
  position,
  alignment,
  variant,
  size,
  items,
  children,
  triggerClassName = '',
  menuClassName = '',
  behavior = 'toggle',
  disabled,
}) => {
  return (
    <>
      {behavior === 'toggle' ? (
        <details
          className={clsx(
            'dropdown',
            dropdownStyles({
              position,
              alignment,
              behavior: disabled ? 'toggle' : behavior,
            }),
          )}
          data-testid='dropdown'
        >
          <summary
            role='button'
            className={clsx(
              'btn m-1',
              dropdownStyles({ variant, size, disabled }),
              triggerClassName,
            )}
            aria-disabled={disabled}
          >
            {label}
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
          className={clsx(
            'dropdown',
            dropdownStyles({
              position,
              alignment,
              behavior: disabled ? 'toggle' : behavior,
            }),
          )}
          data-testid='dropdown'
        >
          <div
            tabIndex={0}
            role='button'
            className={clsx(
              'btn m-1',
              dropdownStyles({ variant, size, disabled }),
              triggerClassName,
            )}
            aria-disabled={disabled}
          >
            {label}
          </div>
          {children ? (
            <div tabIndex={0}>{children}</div>
          ) : (
            items &&
            items.length > 0 && (
              <DropdownMenu
                items={items}
                menuClassName={menuClassName}
                tabIndex={0}
              />
            )
          )}
        </div>
      )}
    </>
  );
};

export default Dropdown;
