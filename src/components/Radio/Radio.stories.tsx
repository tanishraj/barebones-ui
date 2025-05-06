import type { Meta, StoryObj } from '@storybook/react';

import { Radio } from './Radio';

const meta: Meta<typeof Radio> = {
  title: 'Components/Radio',
  component: Radio,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    variant: {
      control: { type: 'select' },
      options: [
        'neutral',
        'primary',
        'secondary',
        'accent',
        'success',
        'warning',
        'info',
        'error',
      ],
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
  args: {
    size: 'md',
    variant: 'primary',
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const Default: Story = {
  render: args => <Radio {...args} />,
};
