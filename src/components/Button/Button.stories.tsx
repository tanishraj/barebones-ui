import { Meta, StoryFn } from '@storybook/react';

import { Button } from './Button';
import { ButtonProps } from './types';

export default {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: {
        type: 'select',
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
      ],
      description: 'Select the button variant',
    },
    outline: {
      control: {
        type: 'select',
      },
      options: ['solid', 'dashed'],
      description: 'Select the outline style',
    },
    size: {
      control: {
        type: 'select',
      },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Select the button size',
    },
    layout: {
      control: {
        type: 'select',
      },
      options: ['wide', 'block', 'square', 'circle'],
      description: 'Select the button layout',
    },
    icon: {
      control: 'text',
      description:
        'Provide an ASCII icon like "★" or "✦". If left empty, a default icon will be used.',
    },
    iconPosition: {
      control: {
        type: 'inline-radio',
      },
      options: ['left', 'right'],
      description: 'Position the icon to the left or right of the button text',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the button',
    },
    active: {
      control: 'boolean',
      description: 'Set the button as active',
    },
    softColor: {
      control: 'boolean',
      description: 'Set the button soft color',
    },
    children: {
      control: 'text',
      description: 'Set the button label',
    },
  },
} as Meta;

const Template: StoryFn<ButtonProps> = ({ icon, ...args }) => (
  <Button icon={icon} {...args}>
    {args.children}
  </Button>
);

export const DefaultButton = Template.bind({});
DefaultButton.args = {
  size: 'md',
  disabled: false,
  icon: '★',
  children: 'Button',
  active: false,
  softColor: false,
};
