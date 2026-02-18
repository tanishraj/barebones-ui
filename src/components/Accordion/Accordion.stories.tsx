import type { Meta, StoryObj } from '@storybook/react-vite';

import { Accordion } from './Accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: { type: 'object' },
      description: 'Array of accordion items',
    },
    variant: {
      control: { type: 'select' },
      options: [
        'primary',
        'secondary',
        'accent',
        'info',
        'success',
        'warning',
        'error',
        'neutral',
      ],
    },
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg'] },
    defaultOpenIndex: { control: 'number' },
    bordered: { control: 'boolean' },
    iconStyle: { control: 'select', options: ['plus', 'chevron'] },
    expandAll: { control: 'boolean' },
    merged: { control: 'boolean' },
  },
  args: {
    items: [
      { title: 'First Item', content: 'Sample content 1' },
      { title: 'Second Item', content: 'Sample content 2' },
      { title: 'Third Item', content: 'Sample content 3' },
    ],
    size: 'md',
    name: 'accordion',
    defaultOpenIndex: -1,
    bordered: true,
    iconStyle: 'plus',
    expandAll: false,
    merged: false,
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  render: args => <Accordion {...args} />,
};
