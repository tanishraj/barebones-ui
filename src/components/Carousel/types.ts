import { HTMLAttributes } from 'react';
import { VariantProps } from 'class-variance-authority';

import { carouselStyles } from './Carousel.styles';

export type CarouselAdditionalProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof carouselStyles>;

export type CarouselSnapPosition = NonNullable<
  VariantProps<typeof carouselStyles>['snapPosition']
>;
