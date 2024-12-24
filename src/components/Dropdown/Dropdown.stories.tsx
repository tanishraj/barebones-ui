import { Meta, StoryFn } from '@storybook/react';

import Dropdown from './Dropdown';
import { DropdownProps } from './types';

export default {
  title: 'Components/Dropdown',
  component: Dropdown,
  argTypes: {
    label: { control: 'text', description: 'Label for the trigger button' },
    position: {
      control: { type: 'select' },
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Position of the dropdown',
    },
    alignment: {
      control: { type: 'select' },
      options: ['start', 'end'],
      description: 'Alignment of the dropdown',
    },
    variant: {
      control: { type: 'select' },
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
      description: 'Button variant',
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Button size',
    },
    behavior: {
      control: { type: 'select' },
      options: ['toggle', 'hover', 'forceOpen', 'clickOutsideClose'],
      description: 'Dropdown behavior',
    },
    items: {
      control: { type: 'object' },
      description: 'Array of dropdown items',
    },
    triggerClassName: {
      control: 'text',
      description: 'Custom class for the trigger button',
    },
    menuClassName: {
      control: 'text',
      description: 'Custom class for the dropdown menu',
    },
  },
} as Meta;

const Template: StoryFn<DropdownProps> = args => <Dropdown {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Dropdown',
  items: [
    { label: 'Item 1', onClick: () => alert('Clicked Item 1') },
    { label: 'Item 2', onClick: () => alert('Clicked Item 2') },
  ],
};

export const WithChildren = Template.bind({});
WithChildren.args = {
  label: 'Dropdown with Children',
  children: (
    <div className='card dropdown-content card-compact z-[1] w-64 bg-primary p-2 text-primary-content shadow'>
      <div className='card-body'>
        <h3 className='card-title'>Card title!</h3>
        <p>you can use any element as a dropdown.</p>
      </div>
    </div>
  ),
};

export const ForceOpen = Template.bind({});
ForceOpen.args = {
  label: 'Force Open',
  behavior: 'forceOpen',
  items: [
    { label: 'Always Open 1', onClick: () => alert('Item 1') },
    { label: 'Always Open 2', onClick: () => alert('Item 2') },
  ],
};

export const HoverBehavior = Template.bind({});
HoverBehavior.args = {
  label: 'Hover Me',
  behavior: 'hover',
  items: [
    { label: 'Hover Item 1', onClick: () => alert('Hover 1') },
    { label: 'Hover Item 2', onClick: () => alert('Hover 2') },
  ],
};
