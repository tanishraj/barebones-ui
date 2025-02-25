import { HTMLAttributes } from 'react';

export interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export interface BodyProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export interface FooterProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}
