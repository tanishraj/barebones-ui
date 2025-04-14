import { Meta, StoryObj } from '@storybook/react';

import { Timeline } from './Timeline';

const meta: Meta = {
  title: 'Components/Timeline',
  component: Timeline,
  tags: ['autodocs'],
};

export default meta;

export const Default: StoryObj = {
  render: () => <Timeline />,
};

export const Vertical: StoryObj = {
  render: () => <Timeline direction='vertical' />,
};

export const Horizontal: StoryObj = {
  render: () => <Timeline direction='horizontal' />,
};
