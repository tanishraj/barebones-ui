import { Meta, StoryFn } from '@storybook/react';

import Button, { ButtonProps } from './Button';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      control: {
        type: 'select', // Dropdown for variants
      },
      options: [
        'primary',
        'secondary',
        'accent',
        'neutral',
        'info',
        'success',
        'warning',
        'error',
        'ghost',
        'link',
        'outline',
      ],
      description: 'Select the button variant',
    },
    size: {
      control: {
        type: 'select', // Dropdown for sizes
      },
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Select the button size',
    },
    icon: {
      control: 'text',
      description:
        'Provide an ASCII icon like "★" or "✦". If left empty, a default icon will be used.',
    },
    showIcon: {
      control: 'boolean', // Toggle to show/hide the icon
      description: 'Show or hide the icon.',
    },
    iconPosition: {
      control: {
        type: 'inline-radio', // Inline radio for icon position
      },
      options: ['left', 'right'],
      description: 'Position the icon to the left or right of the button text',
    },
    disabled: {
      control: 'boolean', // Toggle for disabled state
      description: 'Disable the button',
    },
    children: {
      control: 'text',
      description: 'Set the button label',
    },
  },
} as Meta;

const Template: StoryFn<ButtonProps & { showIcon?: boolean }> = ({
  showIcon,
  icon,
  ...args
}) => (
  <Button icon={showIcon ? icon || '★' : undefined} {...args}>
    {args.children}
  </Button>
);

export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary',
  size: 'md',
  disabled: false,
  showIcon: true, // Default to show the icon
  icon: '', // Use default icon if empty
  iconPosition: 'left',
  children: 'Button',
};
