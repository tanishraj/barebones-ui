import { FC, forwardRef, HTMLAttributes } from 'react';
import clsx from 'clsx';
import { VariantProps } from 'class-variance-authority';

import { BodyProps, FooterProps, HeaderProps, ImageProps } from './types';
import { cardStyles } from './Card.styles';

const Image: FC<ImageProps> = ({ children }) => <figure>{children}</figure>;

const Header: FC<HeaderProps> = ({ className, children, ...props }) => (
  <div className={clsx('card-title', className)} {...props}>
    {children}
  </div>
);

const Body: FC<BodyProps> = ({ className, children, ...props }) => (
  <div className={clsx('card-body', className)} {...props}>
    {children}
  </div>
);

const Footer: FC<FooterProps> = ({ className, children, ...props }) => (
  <div className={clsx('card-actions', className)} {...props}>
    {children}
  </div>
);

interface CardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardStyles> {
  children?: React.ReactNode;
}

const CardRoot = forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, variant, size, ...props }, ref) => {
    return (
      <div
        className={clsx(cardStyles({ variant, size, className }))}
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
Image.displayName = 'Card.Image';

const Card = Object.assign(CardRoot, { Header, Body, Footer, Image });

export { Card };
