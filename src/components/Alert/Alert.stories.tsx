import type { Meta, StoryObj } from '@storybook/react';

import { Alert } from './Alert';
import { Button } from '../Button';

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
  args: {
    title: 'Default Alert',
    description: 'This is a default alert message',
    variant: 'info',
    softColor: false,
    borderStyle: 'none',
    direction: 'horizontal',
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  args: {
    title: 'Default Alert',
    description: 'This is a default alert message',
  },
};

export const WithActions: Story = {
  args: {
    variant: 'warning',
    title: 'Warning',
    description: 'This action cannot be undone',
    actions: (
      <>
        <Button size='sm'>Cancel</Button>
        <Button variant='primary' size='sm'>
          Confirm
        </Button>
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
