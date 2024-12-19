export type DropdownPosition = 'top' | 'bottom' | 'left' | 'right';
export type DropdownAlignment = 'start' | 'middle' | 'end';
export type DropdownSize = 'xs' | 'sm' | 'md' | 'lg';
export type DropdownVariant =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'neutral'
  | 'info'
  | 'success'
  | 'warning'
  | 'error'
  | 'ghost'
  | 'link'
  | 'outline';

export type DropdownProps = {
  children: React.ReactNode;
  position?: DropdownPosition;
  alignment?: DropdownAlignment;
  size?: DropdownSize;
  variant?: DropdownVariant;
  className?: string;
  disabled?: boolean;
};
