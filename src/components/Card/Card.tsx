import { FC, forwardRef, HTMLAttributes } from 'react';
import clsx from 'clsx';
import { VariantProps } from 'class-variance-authority';

import { BodyProps, FooterProps, HeaderProps } from './types';
import { cardVariants } from './Card.styles';

const Header: FC<HeaderProps> = ({ className, ...props }) => (
  <div className={clsx('card-title', className)} {...props} />
);

const Body: FC<BodyProps> = ({ className, ...props }) => (
  <div className={clsx('card-body', className)} {...props} />
);

const Footer: FC<FooterProps> = ({ className, ...props }) => (
  <div className={clsx('card-actions', className)} {...props} />
);

interface CardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  children?: React.ReactNode;
}

const CardRoot = forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, variant, size, ...props }, ref) => {
    return (
      <div
        className={clsx(cardVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  },
);

CardRoot.displayName = 'Card';
Header.displayName = 'Card.Header';
Body.displayName = 'Card.Body';
Footer.displayName = 'Card.Footer';

const Card = Object.assign(CardRoot, { Header, Body, Footer });

export { Card };
