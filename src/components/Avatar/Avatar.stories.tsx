import { Meta, StoryObj } from '@storybook/react';

import { Avatar, AvatarGroup } from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
    },
    shape: {
      control: 'select',
      options: ['squircle', 'hexagon', 'triangle', 'circle', 'square'],
    },
    status: {
      control: 'select',
      options: ['online', 'offline', 'none'],
    },
  },
};

export default meta;

type AvatarStory = StoryObj<typeof Avatar>;
type AvatarGroupStory = StoryObj<typeof AvatarGroup>;

export const SingleAvatar: AvatarStory = {
  render: args => <Avatar {...args} />,
  args: {
    item: {
      url: 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp',
      text: 'D',
    },
    size: 'md',
    shape: 'circle',
    status: 'none',
  },
};

export const GroupAvatars: AvatarGroupStory = {
  render: args => <AvatarGroup {...args} />,
  args: {
    items: [
      {
        url: 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp',
        text: 'D',
      },
      {
        url: '',
        text: 'DA',
      },
      {
        url: 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp',
        text: 'D',
      },
      {
        url: '',
        text: '+99',
      },
    ],
    size: 'md',
    shape: 'circle',
    status: 'none',
  },
  parameters: {
    controls: {
      exclude: ['url', 'text'],
    },
  },
};
