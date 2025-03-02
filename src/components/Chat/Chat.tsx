import { type VariantProps } from 'class-variance-authority';
import clsx from 'clsx';
import { FC, ReactNode, isValidElement, Children } from 'react';

import { chatBubbleStyles, chatStyles } from './Chat.styles';
import { ChatStyleProps } from './types';

interface ChatProps extends ChatStyleProps {
  children: ReactNode;
  className?: string;
}

interface ChatComponent extends FC<ChatProps> {
  Avatar: typeof Avatar;
  Header: typeof Header;
  Bubble: typeof Bubble;
  Footer: typeof Footer;
}

const Chat: ChatComponent = ({ placement, className, children }) => {
  return (
    <div className={chatStyles({ placement, className })}>
      {Children.map(children, child => {
        if (isValidElement(child)) {
          return child;
        }
        return null;
      })}
    </div>
  );
};

interface AvatarProps {
  src: string;
  alt: string;
  className?: string;
}

const Avatar: FC<AvatarProps> = ({ src, alt, className }) => (
  <div className={clsx('avatar chat-image', className)}>
    <div className='w-10 rounded-full'>
      <img src={src} alt={alt} />
    </div>
  </div>
);

interface HeaderProps {
  children: ReactNode;
  className?: string;
}

const Header: FC<HeaderProps> = ({ children, className }) => (
  <div className={clsx('chat-header', className)}>{children}</div>
);

interface BubbleProps extends VariantProps<typeof chatBubbleStyles> {
  children: ReactNode;
  className?: string;
}

const Bubble: FC<BubbleProps> = ({ variant, className, children }) => (
  <div className={chatBubbleStyles({ variant, className })}>{children}</div>
);

interface FooterProps {
  children: ReactNode;
  className?: string;
}

const Footer: FC<FooterProps> = ({ children, className }) => (
  <div className={clsx('chat-footer', className)}>{children}</div>
);

Chat.Avatar = Avatar;
Chat.Header = Header;
Chat.Bubble = Bubble;
Chat.Footer = Footer;

export { Chat };
