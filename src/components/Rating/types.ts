import { VariantProps } from 'class-variance-authority';

import { ratingContainerStyles } from './Rating.styles';

export type RatingSize = VariantProps<typeof ratingContainerStyles>['size'];
