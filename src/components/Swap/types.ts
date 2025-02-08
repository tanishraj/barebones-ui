import { VariantProps } from 'class-variance-authority';

import { swapStyles } from './Swap.styles';

import { Theme } from '@/hooks';

export type AnimationType = VariantProps<typeof swapStyles>['animationType'];
export type Active = VariantProps<typeof swapStyles>['isActive'];

export interface SwapProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof swapStyles> {
  theme?: Theme;
  value?: string;
  onClick?: () => void;
  children?: [React.ReactNode, React.ReactNode];
}
