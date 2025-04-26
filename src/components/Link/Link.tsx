import React, { AnchorHTMLAttributes } from 'react';
import { type VariantProps } from 'class-variance-authority';

import { linkVariants } from './Link.styles';
import { cn } from '../../utils';

export type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> &
  VariantProps<typeof linkVariants>;

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, variant, hoverUnderline, ...props }, ref) => {
    const linkClassName = cn(
      linkVariants({ variant, hoverUnderline }),
      className,
    );

    return <a className={linkClassName} ref={ref} {...props} />;
  },
);

Link.displayName = 'Link';
