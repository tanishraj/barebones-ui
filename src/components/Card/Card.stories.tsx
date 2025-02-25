import { Meta, StoryObj } from '@storybook/react';

import { Card } from './Card';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: args => (
    <Card {...args}>
      <Card.Header>Card Header</Card.Header>
      <Card.Body>Card Body</Card.Body>
      <Card.Footer>Card Footer</Card.Footer>
    </Card>
  ),
};
