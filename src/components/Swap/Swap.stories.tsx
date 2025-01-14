import type { Meta, StoryObj } from '@storybook/react';

import { Swap } from './Swap';

const meta: Meta<typeof Swap> = {
  title: 'Components/Swap',
  component: Swap,
  argTypes: {
    animationType: {
      control: { type: 'select' },
      options: ['rotate', 'flip'],
    },
    active: {
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
    children: [
      <div key='first'>First Child</div>,
      <div key='second'>Second Child</div>,
    ],

    active: false,
  },
};
