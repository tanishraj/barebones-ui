import { VariantProps } from 'class-variance-authority';

import { sizeAndShapeStyles, statusStyles, textStyles } from './Avatar.styles';

export type AvatarSize = VariantProps<typeof sizeAndShapeStyles>['size'];
export type AvatarStatus = VariantProps<typeof statusStyles>['status'];

export type AvatarStyleProps = VariantProps<typeof sizeAndShapeStyles> &
  VariantProps<typeof textStyles> &
  VariantProps<typeof statusStyles>;

export type AvatarItem = {
  url?: string;
  text?: string;
};
