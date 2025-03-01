import type { Meta, StoryObj } from '@storybook/react';

import { Chat } from './Chat';

const meta: Meta<typeof Chat> = {
  title: 'Components/Chat',
  component: Chat,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Chat>;

export const Basic: Story = {
  args: {
    children: 'Hello from DaisyUI Chat!',
    placement: 'start',
  },
};

export const WithAvatar: Story = {
  args: {
    placement: 'start',
    avatar: {
      src: 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp',
      alt: 'User avatar',
    },
    children: 'This is a chat message with avatar',
  },
};

export const WithHeaderFooter: Story = {
  args: {
    placement: 'end',
    header: (
      <>
        Anakin
        <time className='ml-2 text-xs opacity-50'>12:45</time>
      </>
    ),
    children: 'I hate you!',
    footer: <span className='opacity-50'>Seen at 12:46</span>,
  },
};

export const ColoredBubbles: Story = {
  render: () => (
    <div className='flex flex-col gap-4'>
      <Chat placement='start' color='primary'>
        Primary colored bubble
      </Chat>
      <Chat placement='end' color='success'>
        Success colored bubble
      </Chat>
      <Chat placement='start' color='warning'>
        Warning colored bubble
      </Chat>
    </div>
  ),
};

export const FullConversation: Story = {
  render: () => (
    <div className='flex flex-col gap-8'>
      <Chat
        placement='start'
        avatar={{
          src: 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp',
          alt: 'Obi-Wan',
        }}
        header={
          <>
            Obi-Wan Kenobi
            <time className='ml-2 text-xs opacity-50'>12:45</time>
          </>
        }
        footer='Delivered'
      >
        You were the Chosen One!
      </Chat>

      <Chat
        placement='end'
        color='error'
        avatar={{
          src: 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp',
          alt: 'Anakin',
        }}
        header={
          <>
            Anakin
            <time className='ml-2 text-xs opacity-50'>12:46</time>
          </>
        }
        footer='Seen'
      >
        I hate you!
      </Chat>
    </div>
  ),
};
