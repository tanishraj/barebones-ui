import type { Meta, StoryObj } from '@storybook/react';

import { Card } from './Card';
import { Button } from '../Button';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: [
        'default',
        'bordered',
        'dashed',
        'glass',
        'primary',
        'secondary',
        'neutral',
        'accent',
        'info',
        'success',
        'warning',
        'error',
      ],
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    layout: {
      control: { type: 'select' },
      options: ['default', 'full', 'side'],
    },
    shadow: {
      control: { type: 'select' },
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => (
    <Card {...args}>
      <Card.Image>
        <img
          src='https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp'
          alt='Shoes'
        />
      </Card.Image>
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <p>This is a sample card content</p>
        <Card.Actions>
          <Button variant='primary'>Buy Now</Button>
        </Card.Actions>
      </Card.Body>
    </Card>
  ),
};
