import type { Meta, StoryObj } from '@storybook/react-vite';

import { Tooltip } from './Tooltip';
import { Button } from '../Button';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  argTypes: {
    content: { control: 'text' },
    className: { control: 'text' },
    variant: {
      control: { type: 'select' },
      options: [
        'neutral',
        'primary',
        'secondary',
        'accent',
        'info',
        'success',
        'warning',
        'error',
      ],
    },
    position: {
      control: { type: 'select' },
      options: ['top', 'bottom', 'left', 'right'],
    },
    responsive: { control: 'boolean' },
    open: { control: 'boolean' },
  },
  args: {
    content: 'Hello',
    children: <Button>Hover me</Button>,
    className: '',
    position: 'bottom',
    variant: 'neutral',
    responsive: false,
    open: false,
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    content: 'Hello',
    children: <Button>Hover me</Button>,
  },
};

export const CustomContent: Story = {
  args: {
    children: <Button>Hover me</Button>,
    content: (
      <div className='animate-bounce text-orange-400 -rotate-10 text-2xl font-black'>
        Wow!
      </div>
    ),
  },
};

export const ForceOpen: Story = {
  args: {
    content: 'Hello',
    open: true,
    children: <Button>Force open</Button>,
  },
};

export const Positions: Story = {
  render: () => (
    <div className='flex gap-4 flex-wrap'>
      <Tooltip content='Top' position='top' open>
        <Button>Top</Button>
      </Tooltip>
      <Tooltip content='Bottom' position='bottom' open>
        <Button>Bottom</Button>
      </Tooltip>
      <Tooltip content='Left' position='left' open>
        <Button>Left</Button>
      </Tooltip>
      <Tooltip content='Right' position='right' open>
        <Button>Right</Button>
      </Tooltip>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className='flex gap-4 flex-wrap'>
      {meta.argTypes?.variant?.options?.map(variant => (
        <Tooltip key={variant} content={variant} variant={variant} open>
          <Button variant={variant}>{variant}</Button>
        </Tooltip>
      ))}
    </div>
  ),
};

export const Responsive: Story = {
  args: {
    content: 'Hello on large screens!',
    responsive: true,
    children: <Button>Hover on large screen</Button>,
  },
};
