import type { Meta, StoryObj } from '@storybook/react';

import { Alert } from './Alert';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
    },
    borderStyle: {
      control: 'select',
      options: ['outline', 'dash'],
    },
    softColor: {
      control: 'boolean',
    },
    direction: {
      control: 'select',
      options: ['vertical', 'horizontal', 'responsive'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  args: {
    title: 'Default Alert',
    description: 'This is a default alert message',
    softColor: false,
    borderStyle: 'none',
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
    title: 'Info Alert',
    description: 'This is an info alert message',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Success!',
    description: 'Your action was completed successfully',
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    title: 'Error!',
    description: 'An unexpected error occurred',
  },
};

export const WithActions: Story = {
  args: {
    variant: 'warning',
    title: 'Warning',
    description: 'This action cannot be undone',
    actions: (
      <>
        <button className='btn btn-sm'>Cancel</button>
        <button className='btn btn-sm btn-primary'>Confirm</button>
      </>
    ),
  },
};

export const Responsive: Story = {
  args: {
    responsive: true,
    title: 'Responsive Alert',
    description: 'Changes layout on different screen sizes',
  },
};
