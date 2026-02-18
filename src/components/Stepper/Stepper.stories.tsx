import type { Meta, StoryObj } from '@storybook/react-vite';

import { Stepper, StepperItem } from './Stepper';

const meta: Meta<typeof Stepper> = {
  title: 'Components/Stepper',
  component: Stepper,
  tags: ['autodocs'],
  args: {
    children: [
      <StepperItem key='1' variant='primary'>
        Register
      </StepperItem>,
      <StepperItem key='2' variant='primary'>
        Choose plan
      </StepperItem>,
      <StepperItem key='3'>Purchase</StepperItem>,
      <StepperItem key='4'>Receive Product</StepperItem>,
    ],
  },
  argTypes: {
    direction: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
    },
    responsive: {
      control: { type: 'boolean' },
    },
    scrollable: {
      control: { type: 'boolean' },
    },
  },
  parameters: {
    componentSubtitle: 'A progress stepper component with multiple variants',
  },
} satisfies Meta<typeof Stepper>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  args: {
    direction: 'horizontal',
  },
};

export const Vertical: Story = {
  args: {
    direction: 'vertical',
  },
};

export const Responsive: Story = {
  args: {
    responsive: true,
  },
};

export const WithCustomContent: Story = {
  render: () => (
    <Stepper>
      <StepperItem variant='neutral'>
        <span className='step-icon'>😕</span>Step 1
      </StepperItem>
      <StepperItem variant='neutral'>
        <span className='step-icon'>😃</span>Step 2
      </StepperItem>
      <StepperItem>
        <span className='step-icon'>😍</span>Step 3
      </StepperItem>
    </Stepper>
  ),
};

export const WithDataContent: Story = {
  render: () => (
    <Stepper>
      <StepperItem dataContent='?' variant='neutral'>
        Step 1
      </StepperItem>
      <StepperItem dataContent='!' variant='neutral'>
        Step 2
      </StepperItem>
      <StepperItem dataContent='✓' variant='neutral'>
        Step 3
      </StepperItem>
    </Stepper>
  ),
};

export const CustomColors: Story = {
  render: () => (
    <Stepper>
      <StepperItem variant='info'>Fly to moon</StepperItem>
      <StepperItem variant='info'>Shrink the moon</StepperItem>
      <StepperItem variant='info'>Grab the moon</StepperItem>
      <StepperItem variant='error' dataContent='?'>
        Sit on toilet
      </StepperItem>
    </Stepper>
  ),
};

export const Scrollable: Story = {
  args: {
    scrollable: true,
    children: [
      // Long list of Stepper from example
      ...Array.from({ length: 24 }, (_, i) => (
        <StepperItem
          key={i}
          variant={
            i === 0
              ? undefined
              : i >= 1 && i <= 3
                ? 'secondary'
                : i >= 5 && i <= 6
                  ? 'accent'
                  : i >= 8 && i <= 9
                    ? 'error'
                    : i >= 12 && i <= 13
                      ? 'warning'
                      : i >= 15 && i <= 22
                        ? 'neutral'
                        : undefined
          }
        >
          {i === 0 ? 'start' : i === 23 ? 'end' : i + 1}
        </StepperItem>
      )),
    ],
  },
};
