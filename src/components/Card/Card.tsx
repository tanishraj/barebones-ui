import React, { FC, forwardRef, HTMLAttributes } from 'react';
import clsx from 'clsx';
import { VariantProps } from 'class-variance-authority';

import { BodyProps, FooterProps, HeaderProps, ImageProps } from './types';
import { cardStyles } from './Card.styles';

const Image: FC<ImageProps> = React.memo(({ children }) => (
  <figure>{children}</figure>
));

const Title: FC<HeaderProps> = React.memo(
  ({ className, children, ...props }) => (
    <h2 className={clsx('card-title', className)} {...props}>
      {children}
    </h2>
  ),
);

const Body: FC<BodyProps> = React.memo(({ className, children, ...props }) => (
  <div className={clsx('card-body', className)} {...props}>
    {children}
  </div>
));

const Actions: FC<FooterProps> = React.memo(
  ({ className, children, ...props }) => (
    <div className={clsx('card-actions', className)} {...props}>
      {children}
    </div>
  ),
);

export interface CardProps
  extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardStyles> {
  children?: React.ReactNode;
}

const CardRoot = forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, variant, size, layout, shadow, ...props }, ref) => {
    const cardClassName = clsx(
      cardStyles({ variant, size, shadow, layout }),
      className,
    );

    return (
      <div className={cardClassName} ref={ref} {...props}>
        {children}
      </div>
    );
  },
);

CardRoot.displayName = 'Card';
Title.displayName = 'Card.Title';
Body.displayName = 'Card.Body';
Actions.displayName = 'Card.Actions';
Image.displayName = 'Card.Image';

const Card = Object.assign(CardRoot, { Title, Body, Actions, Image });

export { Card };
