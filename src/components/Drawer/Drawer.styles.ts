import { cva } from 'class-variance-authority';

export const drawerStyles = cva('drawer', {
  variants: {
    position: {
      left: '',
      right: 'drawer-end',
    },
    responsive: {
      none: '',
      sm: 'sm:drawer-open',
      md: 'md:drawer-open',
      lg: 'lg:drawer-open',
      xl: 'xl:drawer-open',
    },
  },
  defaultVariants: {
    position: 'left',
    responsive: 'none',
  },
});

export const drawerToggleStyles = cva('drawer-toggle', {
  variants: {},
  defaultVariants: {},
});

export const drawerContentStyles = cva('drawer-content', {
  variants: {},
  defaultVariants: {},
});

export const drawerSideStyles = cva('drawer-side', {
  variants: {},
  defaultVariants: {},
});

export const drawerOverlayStyles = cva('drawer-overlay', {
  variants: {},
  defaultVariants: {},
});

export const drawerButtonStyles = cva('drawer-button', {
  variants: {},
  defaultVariants: {},
});
