import type { Meta, StoryObj } from '@storybook/react-vite';

import {
  Stats,
  Stat,
  StatTitle,
  StatValue,
  StatDesc,
  StatFigure,
  StatActions,
} from './Stat';
import { Button } from '../Button';

const meta: Meta<typeof Stats> = {
  title: 'Components/Stat',
  component: Stats,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    direction: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
    },
    shadow: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Stats>;

// Basic Stats example
export const Basic: Story = {
  args: {
    className: 'shadow',
    children: (
      <Stat>
        <StatTitle>Total Page Views</StatTitle>
        <StatValue>89,400</StatValue>
        <StatDesc>10% more than last month</StatDesc>
      </Stat>
    ),
  },
};

// Multiple Stats example
export const Multiple: Story = {
  args: {
    shadow: true,
    children: (
      <>
        <Stat>
          <StatTitle>Downloads</StatTitle>
          <StatValue>31K</StatValue>
          <StatDesc>Jan 1st - Feb 1st</StatDesc>
        </Stat>

        <Stat>
          <StatTitle>New Users</StatTitle>
          <StatValue>4,200</StatValue>
          <StatDesc>↗︎ 400 (22%)</StatDesc>
        </Stat>

        <Stat>
          <StatTitle>New Registers</StatTitle>
          <StatValue>1,200</StatValue>
          <StatDesc>↘︎ 90 (14%)</StatDesc>
        </Stat>
      </>
    ),
  },
};

// Vertical Stats example
export const Vertical: Story = {
  args: {
    direction: 'vertical',
    className: 'shadow',
    children: (
      <>
        <Stat>
          <StatTitle>Downloads</StatTitle>
          <StatValue>31K</StatValue>
          <StatDesc>Jan 1st - Feb 1st</StatDesc>
        </Stat>

        <Stat>
          <StatTitle>New Users</StatTitle>
          <StatValue>4,200</StatValue>
          <StatDesc>↗︎ 400 (22%)</StatDesc>
        </Stat>
      </>
    ),
  },
};

// Stats with Icons example
export const WithIcons: Story = {
  args: {
    className: 'shadow',
    children: (
      <>
        <Stat>
          <StatFigure className='text-primary'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              className='inline-block w-8 h-8 stroke-current'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
              />
            </svg>
          </StatFigure>
          <StatTitle>Total Likes</StatTitle>
          <StatValue className='text-primary'>25.6K</StatValue>
        </Stat>

        <Stat>
          <StatFigure className='text-secondary'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              className='inline-block w-8 h-8 stroke-current'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4'
              />
            </svg>
          </StatFigure>
          <StatTitle>New Users</StatTitle>
          <StatValue>4,200</StatValue>
          <StatDesc>↗︎ 400 (22%)</StatDesc>
        </Stat>
      </>
    ),
  },
};

// Stats with Actions example
export const WithActions: Story = {
  args: {
    children: (
      <>
        <Stat>
          <StatTitle>Account balance</StatTitle>
          <StatValue>$89,400</StatValue>
          <StatActions>
            <Button size='sm' variant='success'>
              Add funds
            </Button>
          </StatActions>
        </Stat>

        <Stat>
          <StatTitle>Current balance</StatTitle>
          <StatValue>$89,400</StatValue>
          <StatActions className='space-x-2'>
            <Button size='sm'>Withdrawal</Button>
            <Button size='sm'>Deposit</Button>
          </StatActions>
        </Stat>
      </>
    ),
  },
};

// Colored Stats example
export const Colored: Story = {
  args: {
    children: (
      <>
        <Stat className='bg-primary text-primary-content'>
          <StatTitle>Account balance</StatTitle>
          <StatValue>$89,400</StatValue>
          <StatDesc>Jan 1st - Feb 1st</StatDesc>
        </Stat>

        <Stat className='bg-secondary text-secondary-content'>
          <StatTitle>Current balance</StatTitle>
          <StatValue>$7,600</StatValue>
          <StatDesc>↗︎ 1,200 (14%)</StatDesc>
        </Stat>

        <Stat className='bg-accent text-accent-content'>
          <StatTitle>New Registers</StatTitle>
          <StatValue>1,200</StatValue>
          <StatDesc>↘︎ 90 (14%)</StatDesc>
        </Stat>
      </>
    ),
  },
};

// Responsive Stats example
export const Responsive: Story = {
  args: {
    className: 'stats-vertical lg:stats-horizontal shadow',
    children: (
      <>
        <Stat>
          <StatTitle>Downloads</StatTitle>
          <StatValue>31K</StatValue>
          <StatDesc>Jan 1st - Feb 1st</StatDesc>
        </Stat>

        <Stat>
          <StatTitle>New Users</StatTitle>
          <StatValue>4,200</StatValue>
          <StatDesc>↗︎ 400 (22%)</StatDesc>
        </Stat>
      </>
    ),
  },
};
