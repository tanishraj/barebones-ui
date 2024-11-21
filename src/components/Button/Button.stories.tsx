import { Meta, StoryFn } from '@storybook/react';

import { Button } from './Button';
import { ButtonProps } from './types';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: ['primary', 'secondary', 'ghost', 'link'],
      },
    },
    size: {
      control: {
        type: 'select',
        options: ['sm', 'md', 'lg', 'xl', '2xl'],
      },
    },
    disabled: { control: 'boolean' },
    icon: { control: 'boolean' },
  },
} as Meta;

const Template: StoryFn<ButtonProps & { showIcon: boolean }> = ({
  ...args
}) => <Button {...args}> Button</Button>;

export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary',
  size: 'md',
  disabled: false,
  showIcon: false,
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: 'secondary',
  size: 'md',
  disabled: false,
  showIcon: false,
};

export const Ghost = Template.bind({});
Ghost.args = {
  variant: 'ghost',
  size: 'md',
  disabled: false,
  showIcon: false,
};

export const Link = Template.bind({});
Link.args = {
  variant: 'link',
  size: 'md',
  disabled: false,
  showIcon: false,
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  variant: 'primary',
  size: 'md',
  disabled: false,
  showIcon: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  variant: 'primary',
  size: 'md',
  disabled: true,
  showIcon: false,
};
