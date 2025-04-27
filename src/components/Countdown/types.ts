import { VariantProps } from 'class-variance-authority';

import { countdownStyles } from './Countdown.styles';

export type CountdownStylesProps = VariantProps<typeof countdownStyles>;
export type CountdownSize = NonNullable<
  VariantProps<typeof countdownStyles>['size']
>;
