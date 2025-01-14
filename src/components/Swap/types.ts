import { VariantProps } from 'class-variance-authority';

import { swapStyles } from './Swap.styles';

export type AnimationType = VariantProps<typeof swapStyles>['animationType'];
export type Active = VariantProps<typeof swapStyles>['active'];

export interface SwapProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof swapStyles> {
  children?: [React.ReactNode, React.ReactNode];
}
