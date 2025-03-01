import { VariantProps } from 'class-variance-authority';

import { chatBubble, chatContainer } from './Chat.styles';

export type ChatPlacement = VariantProps<typeof chatContainer>['placement'];
export type ChatColor = VariantProps<typeof chatBubble>['color'];
