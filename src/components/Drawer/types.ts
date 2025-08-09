import { ReactNode } from 'react';
import { VariantProps } from 'class-variance-authority';

import { drawerStyles } from './Drawer.styles';

export type DrawerPosition = NonNullable<
  VariantProps<typeof drawerStyles>['position']
>;

export type DrawerResponsive = NonNullable<
  VariantProps<typeof drawerStyles>['responsive']
>;

export interface DrawerProps extends VariantProps<typeof drawerStyles> {
  id: string;
  children?: ReactNode;
  sideContent?: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  contentClassName?: string;
  sideClassName?: string;
  overlayClassName?: string;
  toggleLabel?: ReactNode;
  sideWidth?: string;
}
