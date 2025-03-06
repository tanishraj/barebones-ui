import { Meta, StoryObj } from '@storybook/react';

import { List } from './List';

const meta: Meta = {
  title: 'Components/List',
  component: List,
  tags: ['autodocs'],
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof List>;

export const Default: Story = {
  render: args => <List {...args} />,
};