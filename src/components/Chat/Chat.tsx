import { type VariantProps } from 'class-variance-authority';
import { FC, ReactNode } from 'react';

import { chatBubble, chatContainer } from './Chat.styles';

export interface ChatProps
  extends VariantProps<typeof chatContainer>,
    VariantProps<typeof chatBubble> {
  avatar?: {
    src: string;
    alt: string;
  };
  header?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
  className?: string;
}

export const Chat: FC<ChatProps> = ({
  placement,
  color,
  avatar,
  header,
  footer,
  children,
  className,
}) => {
  return (
    <div className={chatContainer({ placement, className })}>
      {avatar && (
        <div className='avatar chat-image'>
          <div className='w-10 rounded-full'>
            <img src={avatar.src} alt={avatar.alt} />
          </div>
        </div>
      )}

      {header && <div className='chat-header'>{header}</div>}

      <div className={chatBubble({ color })}>{children}</div>

      {footer && <div className='chat-footer'>{footer}</div>}
    </div>
  );
};
