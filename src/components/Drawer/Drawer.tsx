import React, { ReactNode, useEffect, useRef } from 'react';
import clsx from 'clsx';

import { DrawerProps } from './types';
import {
  drawerStyles,
  drawerToggleStyles,
  drawerContentStyles,
  drawerSideStyles,
  drawerOverlayStyles,
} from './Drawer.styles';

export const Drawer: React.FC<DrawerProps> = ({
  id,
  children,
  sideContent,
  open = false,
  onOpenChange,
  position = 'left',
  responsive = 'none',
  className = '',
  contentClassName = '',
  sideClassName = '',
  overlayClassName = '',
  sideWidth = 'w-80',
}) => {
  const checkboxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (checkboxRef.current && checkboxRef.current.checked !== open) {
      checkboxRef.current.checked = open;
    }
  }, [open]);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onOpenChange) {
      onOpenChange(e.target.checked);
    }
  };

  return (
    <div
      className={clsx(
        drawerStyles({
          position,
          responsive,
        }),
        className,
      )}
    >
      <input
        ref={checkboxRef}
        id={id}
        type='checkbox'
        className={drawerToggleStyles()}
        defaultChecked={open}
        onChange={handleCheckboxChange}
      />
      <div className={clsx(drawerContentStyles(), contentClassName)}>
        {children}
      </div>
      <div className={clsx(drawerSideStyles(), sideClassName)}>
        <label
          htmlFor={id}
          aria-label='Close drawer'
          className={clsx(drawerOverlayStyles(), overlayClassName)}
        />
        <div
          className={clsx(
            'menu min-h-full bg-base-200 text-base-content',
            sideWidth,
          )}
        >
          {sideContent}
        </div>
      </div>
    </div>
  );
};

export const DrawerToggle: React.FC<{
  drawerId: string;
  children?: ReactNode;
  className?: string;
}> = ({ drawerId, children, className = '' }) => {
  return (
    <label htmlFor={drawerId} className={clsx('drawer-button', className)}>
      {children}
    </label>
  );
};
