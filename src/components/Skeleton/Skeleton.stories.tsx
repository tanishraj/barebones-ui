import type { Meta, StoryObj } from '@storybook/react';

import { Skeleton } from './Skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['circle', 'rectangle', 'text'],
    },
    className: {
      control: 'text',
    },
  },
  args: {
    variant: 'rectangle',
    className: '',
  },
};

export default meta;

type Story = StoryObj<typeof Skeleton>;

const Template: Story = {
  render: args => <Skeleton {...args} />,
};

export const Default: Story = {
  ...Template,
  args: {
    className: 'h-16 w-16',
  },
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['circle', 'rectangle', 'text'],
    },
    className: {
      control: { type: 'text' },
      description: 'Tailwind classes for sizing and spacing',
    },
  },
};

export const Circle: Story = {
  ...Template,
  args: {
    variant: 'circle',
    className: 'h-16 w-16',
  },
};

export const Text: Story = {
  ...Template,
  args: {
    variant: 'text',
    className: 'w-48',
  },
};

export const Complex: Story = {
  render: () => (
    <div className='flex flex-row gap-8'>
      <div className='flex w-52 flex-col gap-4'>
        <div className='flex items-center gap-4'>
          <Skeleton variant='circle' className='h-16 w-16 shrink-0' />
          <div className='flex flex-col gap-4'>
            <Skeleton variant='text' className='w-20' />
            <Skeleton variant='text' className='w-28' />
          </div>
        </div>
        <Skeleton className='h-32 w-full' />
      </div>

      <div className='flex w-52 flex-col gap-4'>
        <div className='flex items-center gap-4'>
          <Skeleton variant='circle' className='h-16 w-16 shrink-0' />
          <div className='flex flex-col gap-4'>
            <Skeleton variant='text' className='w-20' />
            <Skeleton variant='text' className='w-28' />
          </div>
        </div>
        <Skeleton className='h-32 w-full' />
      </div>
    </div>
  ),
  parameters: {
    controls: { hideNoControlsWarning: true },
    docs: {
      description: {
        story: 'Complex skeleton layout demonstrating various combinations',
      },
    },
  },
};
