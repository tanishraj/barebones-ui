import { Meta, StoryObj } from '@storybook/react';

import { Timeline, TimelineProps } from './Timeline';

const timelineMockData = [
  {
    startContent: '1984',
    endContent: 'First',
  },
  {
    startContent: '1985',
    endContent: 'Second',
  },
  {
    startContent: '1986',
    endContent: 'Third',
  },
  {
    startContent: '1987',
    endContent: 'Fourth',
  },
];

const meta: Meta = {
  title: 'Components/Timeline',
  component: Timeline,
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: { type: 'object' },
      description: 'Array of timeline items',
    },
    direction: {
      control: { type: 'radio' },
      options: ['horizontal', 'vertical'],
    },
    startBorder: { control: 'boolean' },
    endBorder: { control: 'boolean' },
  },
};

export default meta;

export const Default: StoryObj<TimelineProps> = {
  args: {
    direction: 'horizontal',
    startBorder: false,
    endBorder: false,
    items: timelineMockData,
  },

  render: (args: TimelineProps) => {
    return <Timeline {...args} />;
  },
};
