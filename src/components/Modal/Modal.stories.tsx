import { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react-vite';

import { Modal } from './Modal';

export default {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: false,
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'full'],
    },
    position: {
      control: { type: 'select' },
      options: ['top', 'center', 'bottom'],
    },
    closeButton: {
      control: 'boolean',
    },
    closeOnBackdropClick: {
      control: 'boolean',
    },
    onOpen: { action: 'onOpen' },
    onClose: {
      action: 'onClose',
    },
    footer: {
      control: 'text',
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
