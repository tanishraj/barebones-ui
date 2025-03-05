import { Meta, StoryObj } from '@storybook/react';

import { Kbd } from './Kbd';

const meta: Meta = {
  title: 'Components/Kbd',
  component: Kbd,
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: { type: 'text' },
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
  },
  args: {
    text: 'Shift',
  },
};

export default meta;
type Story = StoryObj<typeof Kbd>;

export const Default: Story = {
  render: args => <Kbd {...args} />,
};
