import type { Meta, StoryObj } from '@storybook/react';

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
    defaultOpenIndex: { control: 'number' },
    bordered: { control: 'boolean' },
    iconStyle: { control: 'select' },
    className: { control: 'text' },
  },
  args: {
    items: [
      { title: 'First Item', content: 'Sample content 1' },
      { title: 'Second Item', content: 'Sample content 2' },
      { title: 'Third Item', content: 'Sample content 3' },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  render: args => <Accordion {...args} />,
};
