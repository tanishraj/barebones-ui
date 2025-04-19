import { Meta, StoryObj } from '@storybook/react';

import { Timeline } from './Timeline';

const timelineMockData = [
  {
    start: '1984',
    end: 'First',
  },
  {
    start: '1985',
    end: 'Second',
  },
  {
    start: '1986',
    end: 'Third',
  },
  {
    start: '1987',
    end: 'Fourth',
  },
];

const meta: Meta = {
  title: 'Components/Timeline',
  component: Timeline,
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: { type: 'radio' },
      options: ['horizontal', 'vertical'],
    },
  },
};

export default meta;

export const Default: StoryObj = {
  args: {
    direction: 'horizontal',
  },

  render: args => {
    const timelineArgs = args;

    return (
      <Timeline {...timelineArgs}>
        {timelineMockData.map(item => (
          <Timeline.Item
            key={item.start}
            startContent={item.start}
            endContent={item.end}
          />
        ))}
      </Timeline>
    );
  },
};
