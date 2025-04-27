import { VariantProps } from 'class-variance-authority';

import { sizeAndShapeStyles, statusStyles, textStyles } from './Avatar.styles';

export type AvatarSize = NonNullable<
  VariantProps<typeof sizeAndShapeStyles>['size']
>;
export type AvatarStatus = NonNullable<
  VariantProps<typeof statusStyles>['status']
>;
export type AvatarShape = NonNullable<
  VariantProps<typeof sizeAndShapeStyles>['shape']
>;

export type AvatarStyleProps = VariantProps<typeof sizeAndShapeStyles> &
  VariantProps<typeof textStyles> &
  VariantProps<typeof statusStyles>;

export type AvatarItem = {
  url?: string;
  text?: string;
};
