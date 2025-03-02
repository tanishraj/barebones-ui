import type { Meta, StoryObj } from '@storybook/react';

import { Chat } from './Chat';

const meta: Meta<typeof Chat> = {
  title: 'Components/Chat',
  component: Chat,
  tags: ['autodocs'],
  argTypes: {
    placement: {
      control: { type: 'select' },
      options: ['start', 'end'],
    },
    variant: {
      control: { type: 'select' },
      options: [
        'neutral',
        'primary',
        'secondary',
        'accent',
        'info',
        'success',
        'warning',
        'error',
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Chat>;

export const Default: Story = {
  render: args => (
    <div className='flex flex-col gap-4'>
      <Chat placement={args.placement}>
        <Chat.Bubble variant={args.variant}>
          Hello from DaisyUI Chat!
        </Chat.Bubble>
      </Chat>
    </div>
  ),
};

export const FullFeatured: Story = {
  render: () => (
    <div className='flex flex-col gap-8'>
      <Chat placement='start'>
        <Chat.Avatar
          src='https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
          alt='Obi-Wan'
        />
        <Chat.Header>
          Obi-Wan Kenobi
          <time className='ml-2 text-xs opacity-50'>12:45</time>
        </Chat.Header>
        <Chat.Bubble variant='primary'>You were the Chosen One!</Chat.Bubble>
        <Chat.Footer className='opacity-50'>Delivered</Chat.Footer>
      </Chat>

      <Chat placement='end'>
        <Chat.Avatar
          src='https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
          alt='Anakin'
        />
        <Chat.Header>
          Anakin
          <time className='ml-2 text-xs opacity-50'>12:46</time>
        </Chat.Header>
        <Chat.Bubble variant='error'>I hate you!</Chat.Bubble>
        <Chat.Footer className='opacity-50'>Seen at 12:46</Chat.Footer>
      </Chat>
    </div>
  ),
};
