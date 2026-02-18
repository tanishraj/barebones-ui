import { VariantProps } from 'class-variance-authority';
import { HTMLProps } from 'react';

import { dropdownStyles } from './Dropdown.styles';

export type DropdownMenuItem = {
  key?: string;
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

export type DropdownVariant = NonNullable<
  VariantProps<typeof dropdownStyles>['variant']
>;
export type DropdownSize = NonNullable<
  VariantProps<typeof dropdownStyles>['size']
>;
export type DropdownPosition = NonNullable<
  VariantProps<typeof dropdownStyles>['position']
>;
export type DropdownAlignment = NonNullable<
  VariantProps<typeof dropdownStyles>['alignment']
>;
export type DropdownBehavior = NonNullable<
  VariantProps<typeof dropdownStyles>['behavior']
>;
