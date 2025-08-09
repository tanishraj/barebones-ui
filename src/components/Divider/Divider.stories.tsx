import type { Meta, StoryObj } from '@storybook/react';

import { Divider } from './Divider';

const meta = {
  title: 'Components/Divider',
  component: Divider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: 'Direction of the divider',
    },
    variant: {
      control: 'select',
      options: [
        'default',
        'neutral',
        'primary',
        'secondary',
        'accent',
        'success',
        'warning',
        'info',
        'error',
      ],
      description: 'Color variant of the divider',
    },
    position: {
      control: 'select',
      options: ['center', 'start', 'end'],
      description: 'Position of text within the divider',
    },
    children: {
      control: 'text',
      description: 'Text content to display in the divider',
    },
  },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'OR',
  },
  render: args => (
    <div className='flex w-full flex-col'>
      <div className='grid px-4 py-2 place-items-center rounded-box bg-base-300'>
        Content
      </div>
      <Divider {...args} />
      <div className='grid px-4 py-2 place-items-center rounded-box bg-base-300'>
        Content
      </div>
    </div>
  ),
};

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
    children: 'OR',
  },
  render: args => (
    <div className='flex w-full'>
      <div className='grid grow place-items-center px-4 py-2 rounded-box bg-base-300'>
        Content
      </div>
      <Divider {...args} />
      <div className='grid grow place-items-center px-4 py-2 rounded-box bg-base-300'>
        Content
      </div>
    </div>
  ),
};

export const WithoutText: Story = {
  args: {},
  render: args => (
    <div className='flex h-52 w-full flex-col'>
      <div className='grid px-4 py-2 place-items-center rounded-box bg-base-300'>
        Content
      </div>
      <Divider {...args} />
      <div className='grid px-4 py-2 place-items-center rounded-box bg-base-300'>
        Content
      </div>
    </div>
  ),
};

export const ColorVariants: Story = {
  render: () => (
    <div className='flex w-full flex-col gap-4'>
      <div className='flex flex-col min-w-3xs'>
        <div className='grid place-items-center px-4 py-2 rounded-box bg-base-300'>
          Content
        </div>
        <Divider variant='primary'>Primary</Divider>
        <div className='grid place-items-center px-4 py-2 rounded-box bg-base-300'>
          Content
        </div>
      </div>
      <div className='flex flex-col min-w-3xs'>
        <div className='grid place-items-center px-4 py-2 rounded-box bg-base-300'>
          Content
        </div>
        <Divider variant='secondary'>Secondary</Divider>
        <div className='grid place-items-center px-4 py-2 rounded-box bg-base-300'>
          Content
        </div>
      </div>
      <div className='flex flex-col min-w-3xs'>
        <div className='grid place-items-center px-4 py-2 rounded-box bg-base-300'>
          Content
        </div>
        <Divider variant='accent'>Accent</Divider>
        <div className='grid place-items-center px-4 py-2 rounded-box bg-base-300'>
          Content
        </div>
      </div>
      <div className='flex flex-col min-w-3xs'>
        <div className='grid place-items-center px-4 py-2 rounded-box bg-base-300'>
          Content
        </div>
        <Divider variant='success'>Success</Divider>
        <div className='grid place-items-center px-4 py-2 rounded-box bg-base-300'>
          Content
        </div>
      </div>
    </div>
  ),
};

export const TextPositions: Story = {
  render: () => (
    <div className='flex w-full flex-col gap-4'>
      <div className='flex flex-col min-w-xs'>
        <div className='grid place-items-center px-4 py-2 rounded-box bg-base-300'>
          Content
        </div>
        <Divider position='start'>Start</Divider>
        <div className='grid place-items-center px-4 py-2 rounded-box bg-base-300'>
          Content
        </div>
      </div>
      <div className='flex flex-col'>
        <div className='grid place-items-center px-4 py-2 rounded-box bg-base-300'>
          Content
        </div>
        <Divider position='center'>Center</Divider>
        <div className='grid place-items-center px-4 py-2 rounded-box bg-base-300'>
          Content
        </div>
      </div>
      <div className='flex flex-col'>
        <div className='grid place-items-center px-4 py-2 rounded-box bg-base-300'>
          Content
        </div>
        <Divider position='end'>End</Divider>
        <div className='grid place-items-center px-4 py-2 rounded-box bg-base-300'>
          Content
        </div>
      </div>
    </div>
  ),
};

export const HorizontalWithPositions: Story = {
  render: () => (
    <div className='flex h-52 w-full gap-4'>
      <div className='flex w-full'>
        <div className='grid grow place-items-center px-4 py-2 rounded-box bg-base-300'>
          Content
        </div>
        <Divider orientation='horizontal' position='start'>
          Start
        </Divider>
        <div className='grid grow place-items-center px-4 py-2 rounded-box bg-base-300'>
          Content
        </div>
      </div>
    </div>
  ),
};

export const ResponsiveExample: Story = {
  args: {
    children: 'Responsive',
    className: 'lg:divider-horizontal',
  },
  render: args => (
    <div className='flex w-full flex-col lg:flex-row'>
      <div className='grid grow place-items-center px-4 py-2 rounded-box bg-base-300'>
        Content
      </div>
      <Divider {...args} className='grow' />
      <div className='grid grow place-items-center px-4 py-2 rounded-box bg-base-300'>
        Content
      </div>
    </div>
  ),
};
