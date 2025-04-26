import type { Meta, StoryObj } from '@storybook/react';

import { Link } from './Link';

const meta: Meta<typeof Link> = {
  title: 'Components/Link',
  component: Link,
  tags: ['autodocs'],
  args: {
    children: 'Click me',
    href: '#',
    variant: 'default',
    hoverUnderline: false,
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: [
        'default',
        'primary',
        'secondary',
        'accent',
        'neutral',
        'success',
        'info',
        'warning',
        'error',
      ],
    },
    hoverUnderline: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof Link>;

export const Default: Story = {};
