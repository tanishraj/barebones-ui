import { VariantProps } from 'class-variance-authority';

import { loaderStyles } from './Loader.styles';

export type LoaderVariant = NonNullable<
  VariantProps<typeof loaderStyles>['variant']
>;
export type LoaderSize = NonNullable<VariantProps<typeof loaderStyles>['size']>;
export type LoaderType = NonNullable<VariantProps<typeof loaderStyles>['type']>;
