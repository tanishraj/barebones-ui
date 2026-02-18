import type { Meta, StoryObj } from '@storybook/react-vite';

import { Select } from './Select';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: [
        'primary',
        'secondary',
        'accent',
        'info',
        'success',
        'warning',
        'error',
        'ghost',
      ],
      description: 'Visual variant of the select',
    },
    size: {
      control: {
        type: 'select',
      },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    disabled: {
      control: 'boolean',
    },
    label: {
      control: 'text',
    },
    helperText: {
      control: 'text',
    },
    className: {
      control: 'text',
    },
  },
  args: {
    name: 'optionList',
    options: [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
      { value: '3', label: 'Option 3' },
    ],
    variant: 'primary',
    size: 'md',
    disabled: false,
    label: 'Choose an option',
    helperText: 'This is a helper text',
    className: '',
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  render: args => <Select {...args} />,
};
