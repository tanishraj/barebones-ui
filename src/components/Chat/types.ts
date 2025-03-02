import { VariantProps } from 'class-variance-authority';

import { chatBubbleStyles, chatStyles } from './Chat.styles';

export type ChatStyleProps = VariantProps<typeof chatStyles> &
  VariantProps<typeof chatBubbleStyles>;

export type ChatPlacement = VariantProps<typeof chatStyles>['placement'];
export type ChatBubbleVariant = VariantProps<
  typeof chatBubbleStyles
>['variant'];
