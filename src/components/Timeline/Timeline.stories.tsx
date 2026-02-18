import { Meta, StoryObj } from '@storybook/react-vite';

import { Timeline, TimelineProps } from './Timeline';

const mockEvents = [
  {
    startLabel: '1984',
    endLabel: 'First Milestone',
  },
  {
    startLabel: '1985',
    endLabel: 'Second Milestone',
  },
  {
    startLabel: '1986',
    endLabel: 'Third Milestone',
  },
  {
    startLabel: '1987',
    endLabel: 'Fourth Milestone',
  },
];

const meta: Meta = {
  title: 'Components/Timeline',
  component: Timeline,
  tags: ['autodocs'],
  argTypes: {
    events: {
      control: { type: 'object' },
      description: 'Array of timeline events with labels',
    },
    orientation: {
      control: { type: 'radio' },
      options: ['horizontal', 'vertical'],
    },
    connectorColor: {
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
    showConnectors: { control: 'boolean' },
    contentAlign: {
      control: { type: 'radio' },
      options: ['compact', 'spacious'],
    },
    completedSteps: {
      control: { type: 'number' },
    },
    completedColor: {
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
  },
};

export default meta;

export const Default: StoryObj<TimelineProps> = {
  args: {
    orientation: 'horizontal',
    showConnectors: true,
    events: mockEvents,
    completedSteps: 2,
    connectorColor: 'neutral',
    completedColor: 'success',
  },
  render: args => <Timeline {...args} />,
};
