import type { Meta, StoryObj } from '@storybook/react-vite';

import Range from './Range';

const meta: Meta<typeof Range> = {
  title: 'Components/Range',
  component: Range,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
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
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    showLabels: { control: 'boolean' },
  },
  args: {
    variant: 'neutral',
    size: 'md',
    showLabels: false,
    min: 0,
    max: 100,
    step: 1,
  },
} satisfies Meta<typeof Range>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => <Range {...args} />,
};
