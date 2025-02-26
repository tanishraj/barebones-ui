import { FC, HTMLAttributes, ReactElement, ReactNode } from 'react';

export interface ImageProps {
  children: ReactElement<HTMLImageElement>;
}

export interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export interface BodyProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export interface FooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export interface CardComponent {
  Header: FC<HeaderProps>;
  Body: FC<BodyProps>;
  Footer: FC<FooterProps>;
}
