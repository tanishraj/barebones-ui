import type { Meta, StoryObj } from '@storybook/react-vite';

import { List } from './List';

const meta: Meta<typeof List> = {
  title: 'Components/List',
  component: List,
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional class names for the list container',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => (
    <List {...args}>
      <List.Row>
        <List.Col>
          <img
            className='size-10 rounded-full'
            src='https://img.daisyui.com/images/profile/demo/1@94.webp'
            alt='Album cover'
          />
        </List.Col>

        <List.Col>
          <div className='font-medium'>Dio Lupa</div>
          <div className='text-xs font-semibold uppercase opacity-60'>
            Remaining Reason
          </div>
        </List.Col>
      </List.Row>

      <List.Row>
        <List.Col>
          <img
            className='size-10 rounded-box'
            src='https://img.daisyui.com/images/profile/demo/4@94.webp'
            alt='Album cover'
          />
        </List.Col>

        <List.Col>
          <div className='font-medium'>Ellie Beilish</div>
          <div className='text-xs font-semibold uppercase opacity-60'>
            Bears of a fever
          </div>
        </List.Col>
      </List.Row>
    </List>
  ),
};
