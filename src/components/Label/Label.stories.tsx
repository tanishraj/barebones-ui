import { Meta, StoryObj } from '@storybook/react-vite';

import { Label } from './Label';

const meta: Meta<typeof Label> = {
  title: 'Components/Label',
  component: Label,
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
    },
    position: {
      control: { type: 'select' },
      options: ['left', 'right'],
    },
    type: {
      control: { type: 'select' },
      options: ['input', 'select', 'float'],
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
  },
  args: {
    text: 'Name',
    position: 'left',
    type: 'input',
    size: 'md',
  },
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {
  render: args => {
    if (args.type === 'select') {
      return (
        <Label {...args} text='Select'>
          <select>
            <option value=''>Select an option</option>
            <option value=''>Option 1</option>
            <option value=''>Option 2</option>
            <option value=''>Option 3</option>
          </select>
        </Label>
      );
    }
    return (
      <Label {...args}>
        <input
          type='text'
          placeholder='Your Name'
          className={args.type === 'float' ? 'input' : ''}
        />
      </Label>
    );
  },
};
