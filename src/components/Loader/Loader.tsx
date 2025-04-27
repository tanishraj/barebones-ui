import { VariantProps } from 'class-variance-authority';
import { clsx } from 'clsx';
import { ComponentPropsWithoutRef } from 'react';

import { loaderStyles } from './Loader.styles';

type LoaderProps = ComponentPropsWithoutRef<'span'> &
  VariantProps<typeof loaderStyles> & {};

export const Loader = ({
  type,
  size,
  variant,
  className,
  ...props
}: LoaderProps) => {
  return (
    <span
      className={clsx(loaderStyles({ type, size, variant }), className)}
      role='loader'
      {...props}
    />
  );
};
