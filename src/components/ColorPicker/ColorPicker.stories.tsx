import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { ColorPicker } from './ColorPicker';

const meta: Meta<typeof ColorPicker> = {
  title: 'Components/ColorPicker',
  component: ColorPicker,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    value: {
      control: { type: 'color' },
    },
    onChange: { action: 'colorChanged' },
  },
  args: {
    value: '#3b82f6',
    label: 'Color Input',
    labelPosition: 'left',
    size: 'md',
    className: '',
  },
};

export default meta;

type Story = StoryObj<typeof ColorPicker>;

export const Default: Story = {
  render: args => {
    const [value, setValue] = useState(args.value);
    return (
      <ColorPicker
        {...args}
        value={value}
        onChange={color => setValue(color)}
      />
    );
  },
};
