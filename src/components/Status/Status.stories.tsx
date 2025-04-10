import { Meta, StoryObj } from '@storybook/react';

import { Status } from './Status';

const meta: Meta<typeof Status> = {
  title: 'Components/Status',
  component: Status,
  tags: ['autodocs'],
  argTypes: {
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
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
  },
  args: {
    variant: 'secondary',
    size: 'lg',
  },
};

export default meta;

export const Default: StoryObj<typeof Status> = {
  render: args => <Status {...args} />,
};
