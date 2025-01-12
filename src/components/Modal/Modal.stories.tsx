import { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';

import { Modal } from './Modal';

export default {
  title: 'Components/Modal',
  component: Modal,
  argTypes: {
    isOpen: {
      control: false, // Controlled internally via the button
      description: 'Controls the visibility of the modal',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'full'],
      description: 'Defines the size of the modal',
    },
    position: {
      control: { type: 'select' },
      options: ['top', 'center', 'bottom'],
      description: 'Defines the position of the modal',
    },
    closeButton: {
      control: 'boolean',
      description: 'Displays a close button in the modal',
    },
    closeOnBackdropClick: {
      control: 'boolean',
      description: 'Closes modal on backdrop click',
    },
    onOpen: { action: 'onOpen', description: 'Callback when the modal opens' },
    onClose: {
      action: 'onClose',
      description: 'Callback when the modal closes',
    },
    footer: {
      control: 'text',
      description: 'Footer content for the modal',
    },
  },
} as Meta;

const Template: StoryFn = args => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <button className='btn btn-primary' onClick={() => setIsModalOpen(true)}>
        Open Modal
      </button>
      <Modal
        {...args}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  size: 'md',
  position: 'center',
  closeButton: true,
  closeOnBackdropClick: true,
  footer: <button className='btn'>Custom Footer Button</button>,
  children: (
    <>
      <h3 className='text-lg font-bold'>Modal Title</h3>
      <p className='py-4'>This is the content of the modal.</p>
    </>
  ),
};
