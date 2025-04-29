import type { Meta, StoryObj } from '@storybook/react';

import { RadialProgress } from './RadialProgress';

const meta: Meta<typeof RadialProgress> = {
  title: 'Components/RadialProgress',
  component: RadialProgress,
  tags: ['autodocs'],
  args: {
    value: 70,
  },
  argTypes: {
    value: {
      control: { type: 'number', min: 0, max: 100 },
    },
    size: {
      control: 'text',
    },
    thickness: {
      control: 'text',
    },
    color: {
      control: 'text',
    },
    bgColor: {
      control: 'text',
    },
    borderColor: {
      control: 'text',
    },
    borderWidth: {
      control: 'text',
    },
  },
};
export default meta;

type Story = StoryObj<typeof RadialProgress>;

export const Default: Story = {};

export const DifferentValues: Story = {
  render: () => (
    <div className='flex flex-wrap gap-4'>
      <RadialProgress value={0} />
      <RadialProgress value={20} />
      <RadialProgress value={60} />
      <RadialProgress value={80} />
      <RadialProgress value={100} />
    </div>
  ),
};

export const CustomColor: Story = {
  args: {
    color: 'primary',
  },
};

export const WithBackgroundAndBorder: Story = {
  args: {
    color: 'primary-content',
    bgColor: 'primary',
    borderColor: 'primary',
    borderWidth: '4',
  },
};

export const CustomSizeAndThickness: Story = {
  render: () => (
    <div className='flex flex-wrap gap-4'>
      <RadialProgress value={70} size='12rem' thickness='2px' />
      <RadialProgress value={70} size='12rem' thickness='2rem' />
    </div>
  ),
};
