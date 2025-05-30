import type { Meta, StoryObj } from '@storybook/react';

import { ColorPicker } from './ColorPicker';

const meta: Meta<typeof ColorPicker> = {
  title: 'Components/ColorPicker',
  component: ColorPicker,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    value: {
      control: { type: 'color' },
    },
    onChange: { action: 'colorChanged' },
  },
  args: {
    value: '#3b82f6',
  },
};

export default meta;

type Story = StoryObj<typeof ColorPicker>;

export const Default: Story = {
  args: {
    label: 'Primary Color',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    label: 'Accent Color',
    value: '#ef4444',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    label: 'Background Color',
    value: '#10b981',
  },
};

export const WithoutLabel: Story = {
  args: {
    value: '#8b5cf6',
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    label: 'Full Width Picker',
    value: '#f59e0b',
    onChange: (color: string) => console.log(`Selected color: ${color}`),
  },
  decorators: [
    Story => (
      <div className='max-w-md'>
        <Story />
      </div>
    ),
  ],
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Picker',
    value: '#6b7280',
    disabled: true,
  },
};
