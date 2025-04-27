import { VariantProps } from 'class-variance-authority';

import { selectStyles } from './Select.styles';

export type SelectOptions = {
  value: string;
  label: string;
};

export type SelectVariant = NonNullable<
  VariantProps<typeof selectStyles>['variant']
>;
export type SelectSize = NonNullable<VariantProps<typeof selectStyles>['size']>;
export type SelectElementProps = Omit<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  'size'
>;
