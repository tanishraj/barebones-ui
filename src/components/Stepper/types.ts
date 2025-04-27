import { VariantProps } from 'class-variance-authority';

import { stepItemStyles, stepsContainerStyles } from './Stepper.styles';

export type StepsDirection = NonNullable<
  VariantProps<typeof stepsContainerStyles>['direction']
>;
export type StepVariant = NonNullable<
  VariantProps<typeof stepItemStyles>['variant']
>;
