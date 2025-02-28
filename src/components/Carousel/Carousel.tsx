import { FC, ReactNode } from 'react';

export interface CarouselProps {
  imageList: string[]a
}

export const Carousel: FC<CarouselProps> = ({ items }) => {
  return (
    <div className='carousel rounded-box'>
      {items.map((item, index) => (
        <div key={index} className='carousel-item'>
          {typeof item === 'string' ? (
            <img
              src='https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp'
              alt='Burger'
            />
          ) : (
            item
          )}
        </div>
      ))}
    </div>
  );
};
