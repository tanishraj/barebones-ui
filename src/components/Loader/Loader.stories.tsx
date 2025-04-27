import type { Meta, StoryObj } from '@storybook/react';

import { Loader } from './Loader';

const meta: Meta<typeof Loader> = {
  title: 'Components/Loader',
  component: Loader,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['spinner', 'dots', 'ring', 'ball', 'bars', 'infinity'],
    },
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    variant: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'accent',
        'neutral',
        'info',
        'success',
        'warning',
        'error',
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Loader>;

export const Default: Story = {
  args: {},
};

export const Types: Story = {
  render: () => (
    <div className='flex gap-4'>
      <Loader type='spinner' />
      <Loader type='dots' />
      <Loader type='ring' />
      <Loader type='ball' />
      <Loader type='bars' />
      <Loader type='infinity' />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className='flex items-center gap-4'>
      <Loader size='xs' />
      <Loader size='sm' />
      <Loader size='md' />
      <Loader size='lg' />
      <Loader size='xl' />
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className='flex gap-4'>
      <Loader variant='primary' />
      <Loader variant='secondary' />
      <Loader variant='accent' />
      <Loader variant='neutral' />
      <Loader variant='info' />
      <Loader variant='success' />
      <Loader variant='warning' />
      <Loader variant='error' />
    </div>
  ),
};
