import { VariantProps } from 'class-variance-authority';
import { FC, HTMLAttributes, ReactElement, ReactNode } from 'react';

import { cardStyles } from './Card.styles';

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

export type CardVariant = NonNullable<
  VariantProps<typeof cardStyles>['variant']
>;
export type CardSize = NonNullable<VariantProps<typeof cardStyles>['size']>;
export type CardLayout = NonNullable<VariantProps<typeof cardStyles>['layout']>;
export type CardShadow = NonNullable<VariantProps<typeof cardStyles>['shadow']>;
