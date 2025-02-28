import { Children, FC, ReactNode } from 'react';
import clsx from 'clsx';

import { carouselStyles } from './Carousel.styles';
import { CarouselAdditionalProps } from './types';

export interface CarouselProps extends CarouselAdditionalProps {
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
