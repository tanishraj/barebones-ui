import { Meta, StoryObj } from '@storybook/react/*';

import { Avatar } from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    item: { control: 'object' },
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg'] },
    shape: {
      control: 'select',
      options: ['squircle', 'hexagon', 'triangle', 'circle', 'square'],
    },
    status: {
      control: 'select',
      options: ['online', 'offline', 'none'],
    },
  },
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

type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  render: args => <Avatar {...args} />,
};

export default meta;
