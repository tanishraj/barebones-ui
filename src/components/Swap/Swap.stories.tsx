import type { Meta, StoryObj } from '@storybook/react';

import { Swap } from './Swap';

const meta: Meta<typeof Swap> = {
  title: 'Components/Swap',
  component: Swap,
  tags: ['autodocs'],
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
      <div
        key='first'
        className='rounded-box bg-primary p-4 text-primary-content'
      >
        First Child
      </div>,
      <div
        key='second'
        className='rounded-box bg-secondary p-4 text-secondary-content'
      >
        Second Child
      </div>,
    ],
  },
};

export const RotateAnimation: Story = {
  args: {
    animationType: 'rotate',
    active: false,
    children: [
      <div
        key='first'
        className='rounded-box bg-primary p-4 text-primary-content'
      >
        First Child
      </div>,
      <div
        key='second'
        className='rounded-box bg-secondary p-4 text-secondary-content'
      >
        Second Child
      </div>,
    ],
  },
};

export const FlipAnimation: Story = {
  args: {
    animationType: 'flip',
    active: true,
    children: [
      <div
        key='first'
        className='rounded-box bg-primary p-4 text-primary-content'
      >
        First Child
      </div>,
      <div
        key='second'
        className='rounded-box bg-secondary p-4 text-secondary-content'
      >
        Second Child
      </div>,
    ],
  },
};

export const CustomClassNames: Story = {
  args: {
    className: 'custom-class',
    active: false,
    children: [
      <div
        key='first'
        className='rounded-box bg-primary p-4 text-primary-content'
      >
        First Child
      </div>,
      <div
        key='second'
        className='rounded-box bg-secondary p-4 text-secondary-content'
      >
        Second Child
      </div>,
    ],
  },
};
