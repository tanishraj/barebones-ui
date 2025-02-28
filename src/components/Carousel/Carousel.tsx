import { VariantProps } from 'class-variance-authority';
import { Children, FC, HTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

import { carouselStyles } from './Carousel.styles';

export interface CarouselProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof carouselStyles> {
  children: ReactNode[] | ReactNode;
}

export const Carousel: FC<CarouselProps> = ({
  className,
  snapPosition,
  verticalScroll,
  children,
}) => {
  const carouselClassName = clsx(
    carouselStyles({ snapPosition, verticalScroll }),
    className,
  );
  return (
    <div className={carouselClassName}>
      {Children.map(children, (child, index) => (
        <div key={index} className='carousel-item'>
          {child}
        </div>
      ))}
    </div>
  );
};
