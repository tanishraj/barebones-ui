import { FC } from 'react';
import clsx from 'clsx';

import { BodyProps, FooterProps, HeaderProps } from './types';

const Header: FC<HeaderProps> = ({ className, ...props }) => (
  <div className={clsx('card-title', className)} {...props} />
);

const Body: FC<BodyProps> = ({ className, ...props }) => (
  <div className={clsx('card-body', className)} {...props} />
);

const Footer: FC<FooterProps> = ({ className, ...props }) => (
  <div className={clsx('card-actions', className)} {...props} />
);

interface CardComponent {
  Header: FC<HeaderProps>;
  Body: FC<BodyProps>;
  Footer: FC<FooterProps>;
}

interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    CardComponent {}

const Card: FC<CardProps> = ({ children }) => {
  return <div className='card'>{children}</div>;
};

Card.displayName = 'Card';
Header.displayName = 'Card.Header';
Body.displayName = 'Card.Body';
Footer.displayName = 'Card.Footer';

export { Card, Header, Body, Footer };
