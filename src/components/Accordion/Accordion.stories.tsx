import type { Meta, StoryObj } from '@storybook/react';

import { Accordion } from './Accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
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

export const Default: Story = {};

export const Bordered: Story = {
  args: {
    bordered: true,
  },
};

export const PlusIcon: Story = {
  args: {
    iconStyle: 'plus',
  },
};

export const DefaultOpen: Story = {
  args: {
    defaultOpenIndex: 1,
  },
};
