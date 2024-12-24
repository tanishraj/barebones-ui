import { cva } from 'class-variance-authority';

export const dropdownStyles = cva('', {
  variants: {
    variant: {
      primary: 'btn-primary',
      secondary: 'btn-secondary',
      accent: 'btn-accent',
      neutral: 'btn-neutral',
      info: 'btn-info',
      success: 'btn-success',
      warning: 'btn-warning',
      error: 'btn-error',
      ghost: 'btn-ghost',
      link: 'btn-link',
      outline: 'btn-outline',
    },
    size: {
      xs: 'btn-xs',
      sm: 'btn-sm',
      md: 'btn-md',
      lg: 'btn-lg',
    },
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
      clickOutsideClose: 'dropdown-close',
    },
    disabled: {
      true: 'btn-disabled',
    },
  },
  defaultVariants: {
    position: 'bottom',
    behavior: 'toggle',
  },
});
