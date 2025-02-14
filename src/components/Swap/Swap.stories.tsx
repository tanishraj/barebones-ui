import type { Meta, StoryObj } from '@storybook/react';

import { Swap } from './Swap';

const meta: Meta<typeof Swap> = {
  title: 'Components/Swap',
  tags: ['autodocs'],
  component: Swap,
  argTypes: {
    animationType: {
      control: { type: 'select' },
      options: ['fade', 'rotate', 'flip'],
    },
    isActive: {
      control: { type: 'boolean' },
    },
    children: {
      control: { type: 'text' },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Swap>;

export const Default: Story = {
  args: {
    animationType: 'fade',
    children: [
      <div key='first'>First Child</div>,
      <div key='second'>Second Child</div>,
    ],

    isActive: false,
  },
};
