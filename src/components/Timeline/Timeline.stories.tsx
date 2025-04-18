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
];

const meta: Meta = {
  title: 'Components/Timeline',
  component: Timeline,
  tags: ['autodocs'],
};

export default meta;

export const Default: StoryObj = {
  render: () => (
    <Timeline>
      {timelineMockData.map((item, index) => (
        <Timeline.Item key={index} start={item.start} end={item.end} />
      ))}
    </Timeline>
  ),
};

export const Vertical: StoryObj = {
  render: () => (
    <Timeline direction='vertical'>
      <Timeline.Item />
    </Timeline>
  ),
};

export const Horizontal: StoryObj = {
  render: () => (
    <Timeline direction='horizontal'>
      <Timeline.Item />
    </Timeline>
  ),
};
