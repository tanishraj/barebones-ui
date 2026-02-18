import { Meta, StoryFn } from '@storybook/react-vite';
import { useEffect, useState } from 'react';

import { Countdown } from './Countdown';

const meta: Meta = {
  title: 'Components/Countdown',
  component: Countdown,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
    },
  },
  args: {
    size: 'md',
  },
};

export default meta;

export const Default: StoryFn = args => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prevCount => prevCount + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <Countdown {...args} value={count} />;
};
