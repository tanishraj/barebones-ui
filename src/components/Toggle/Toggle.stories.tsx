import type { Meta, StoryObj } from '@storybook/react-vite';
import { FileCheck01, FileX01 } from '@untitled-ui/icons-react';

import Toggle from './Toggle';

const meta: Meta<typeof Toggle> = {
  title: 'Components/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    variant: {
      control: { type: 'select' },
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
    disabled: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  args: {},
};

export const Sizes: Story = {
  render: () => (
    <div className='flex flex-col gap-4'>
      <Toggle size='xs' />
      <Toggle size='sm' />
      <Toggle size='md' />
      <Toggle size='lg' />
      <Toggle size='xl' />
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className='flex flex-col gap-4'>
      <Toggle variant='primary' defaultChecked />
      <Toggle variant='secondary' defaultChecked />
      <Toggle variant='accent' defaultChecked />
      <Toggle variant='neutral' defaultChecked />
      <Toggle variant='info' defaultChecked />
      <Toggle variant='success' defaultChecked />
      <Toggle variant='warning' defaultChecked />
      <Toggle variant='error' defaultChecked />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className='flex flex-col gap-4'>
      <Toggle disabled />
      <Toggle disabled defaultChecked />
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Toggle labelClassName='text-base-content'>
      <FileCheck01 className='w-4 h-4' />
      <FileX01 className='w-4 h-4' />
    </Toggle>
  ),
};

export const CustomColors: Story = {
  render: () => (
    <Toggle
      className='border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800'
      defaultChecked
    />
  ),
};

export const Indeterminate: Story = {
  args: {
    indeterminate: true,
  },
};
