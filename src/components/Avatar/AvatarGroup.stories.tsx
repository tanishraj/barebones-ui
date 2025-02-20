import { Meta, StoryObj } from '@storybook/react/*';

import { AvatarGroup } from './AvatarGroup';

const meta: Meta<typeof AvatarGroup> = {
  title: 'Components/Avatar',
  component: AvatarGroup,
  tags: ['autodocs'],
  argTypes: {
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
};

type Story = StoryObj<typeof AvatarGroup>;

export const GroupAvatar: Story = {
  render: args => <AvatarGroup {...args} />,
};

export default meta;
