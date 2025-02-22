import { Meta, StoryObj } from '@storybook/react';

import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: { type: 'text' },
    },
    variant: {
      control: { type: 'select' },
      options: [
        'neutral',
        'primary',
        'secondary',
        'accent',
        'ghost',
        'info',
        'success',
        'warning',
        'error',
      ],
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg'],
    },
    outline: {
      control: { type: 'boolean' },
    },
  },
  args: {
    children: 'Badge',
    variant: 'primary',
    size: 'md',
    outline: false,
  },
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  render: args => <Badge {...args} />,
};
