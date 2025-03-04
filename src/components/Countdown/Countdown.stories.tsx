import { Meta, StoryObj } from '@storybook/react';

import { Countdown } from './Countdown';

const meta: Meta = {
  title: 'Components/Countdown',
  component: Countdown,
  tags: ['autodocs'],
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof Countdown>;

export const Default: Story = {
  render: args => <Countdown {...args} />,
};
