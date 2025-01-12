import { VariantProps } from 'class-variance-authority';
import { HTMLProps } from 'react';

import { dropdownStyles } from './Dropdown.styles';

export type DropdownMenuItem = {
  label: React.ReactNode;
  onClick?: () => void;
  className?: HTMLProps<HTMLDivElement>['className'];
  disabled?: boolean;
};

export interface DropdownProps extends VariantProps<typeof dropdownStyles> {
  label: React.ReactNode;
  children?: React.ReactNode;
  items?: DropdownMenuItem[];
  className?: string;
  triggerClassName?: string;
  menuClassName?: string;
  disabled?: boolean;
}
