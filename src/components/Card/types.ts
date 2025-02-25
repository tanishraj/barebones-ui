import { FC, HTMLAttributes } from 'react';

export interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export interface BodyProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export interface FooterProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export interface CardComponent {
  Header: FC<HeaderProps>;
  Body: FC<BodyProps>;
  Footer: FC<FooterProps>;
}
