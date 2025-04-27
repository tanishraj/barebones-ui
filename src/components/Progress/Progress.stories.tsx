import type { Meta, StoryObj } from '@storybook/react';

import { Progress } from './Progress';
import { ProgressVariant } from './types';

const meta: Meta<typeof Progress> = {
  title: 'Components/Progress',
  component: Progress,
  tags: ['autodocs'],
  argTypes: {
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
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    indeterminate: { control: 'boolean' },
  },
  args: {
    indeterminate: true,
  },
};

export default meta;

type Story = StoryObj<typeof Progress>;

const Template = (variant?: ProgressVariant) => (
  <div className='flex flex-col gap-4'>
    <Progress variant={variant} value={0} className='w-56' />
    <Progress variant={variant} value={10} className='w-56' />
    <Progress variant={variant} value={40} className='w-56' />
    <Progress variant={variant} value={70} className='w-56' />
    <Progress variant={variant} value={100} className='w-56' />
  </div>
);

export const Default: Story = {
  render: args => Template(args.variant as ProgressVariant),
};

export const Indeterminate: Story = {
  args: {
    className: 'w-56',
    indeterminate: true,
  },
};
