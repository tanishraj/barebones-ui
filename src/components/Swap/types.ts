import { VariantProps } from 'class-variance-authority';

import { swapStyles } from './Swap.styles';

export type AnimationType = NonNullable<
  VariantProps<typeof swapStyles>['animationType']
>;
export type Active = NonNullable<VariantProps<typeof swapStyles>['isActive']>;

export interface SwapProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof swapStyles> {
  children?: [React.ReactNode, React.ReactNode];
  onClick?: () => void;
}
