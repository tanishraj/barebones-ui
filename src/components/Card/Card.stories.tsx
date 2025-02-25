import type { Meta, StoryObj } from '@storybook/react';

import { Card } from './Card';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'bordered', 'image'],
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'compact', 'normal', 'side'],
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <Card>
        <Card.Header>Card Title</Card.Header>
        <Card.Body>
          <h2 className='card-title'>Hello World</h2>
          <p>This is a sample card content</p>
        </Card.Body>
        <Card.Footer>Card Footer</Card.Footer>
      </Card>
    ),
  },
};

export const Bordered: Story = {
  args: {
    variant: 'bordered',
    children: (
      <Card>
        <Card.Header>Bordered Card</Card.Header>
        <Card.Body>This card has a border</Card.Body>
        <Card.Footer>Footer</Card.Footer>
      </Card>
    ),
  },
};

export const Compact: Story = {
  args: {
    size: 'compact',
    children: (
      <Card>
        <Card.Header>Compact Card</Card.Header>
        <Card.Body>This card has compact padding</Card.Body>
        <Card.Footer>Footer</Card.Footer>
      </Card>
    ),
  },
};
