import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Rating } from './Rating';

const meta: Meta<typeof Rating> = {
  title: 'Components/Rating',
  component: Rating,
  tags: ['autodocs'],
  args: {
    value: 3,
    max: 5,
    readOnly: false,
    color: 'bg-orange-400',
    maskType: 'star',
    size: 'md',
    clearable: false,
    half: false,
  },
  argTypes: {
    value: {
      control: { type: 'number', min: 0, max: 5, step: 0.5 },
    },
    max: {
      control: { type: 'number', min: 1, max: 10, step: 1 },
    },
    readOnly: {
      control: 'boolean',
    },
    color: {
      control: 'select',
      options: [
        'bg-orange-400',
        'bg-green-500',
        'bg-red-400',
        'bg-yellow-400',
        'bg-lime-400',
        'bg-blue-400',
      ],
    },
    maskType: {
      control: 'select',
      options: ['star', 'star-2', 'heart'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    clearable: {
      control: 'boolean',
    },
    half: {
      control: 'boolean',
    },
    onChange: { action: 'changed' },
  },
};

export default meta;

type Story = StoryObj<typeof Rating>;

export const Default: Story = {
  render: args => {
    const [value, setValue] = useState(args.value || 0);
    return (
      <Rating
        {...args}
        value={value}
        onChange={newValue => {
          setValue(newValue);
          args.onChange?.(newValue);
        }}
      />
    );
  },
};
