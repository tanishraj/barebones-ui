import { Meta, StoryObj } from '@storybook/react';

import { [FTName] } from './[FTName]';

const meta: Meta = {
  title: 'Components/[FTName]',
  component: [FTName],
  tags: ['autodocs'],
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof [FTName]>;

export const Default: Story = {
  render: args => <[FTName] {...args} />,
};
