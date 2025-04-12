import type { Meta, StoryObj } from '@storybook/react';

import { Table } from './Table';

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    pinRows: { control: 'boolean' },
    pinColumns: { control: 'boolean' },
    zebra: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Table>;

const sampleData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Developer' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Designer' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Manager' },
];

const Template = (args: typeof meta.args) => (
  <Table {...args}>
    <Table.Head>
      <Table.Row>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Email</Table.HeaderCell>
        <Table.HeaderCell>Role</Table.HeaderCell>
        <Table.HeaderCell action>Actions</Table.HeaderCell>
      </Table.Row>
    </Table.Head>
    <Table.Body>
      {sampleData.map(item => (
        <Table.Row key={item.id}>
          <Table.Cell>{item.name}</Table.Cell>
          <Table.Cell>{item.email}</Table.Cell>
          <Table.Cell>{item.role}</Table.Cell>
          <Table.Cell action>
            <button className='btn btn-ghost btn-xs'>Edit</button>
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
);

export const Default: Story = {
  render: Template,
};

export const PinnedRows: Story = {
  args: { pinRows: true },
  render: args => (
    <div className='h-48 overflow-y-auto'>
      <Template {...args} />
    </div>
  ),
};

export const DifferentSizes: Story = {
  render: () => (
    <div className='flex flex-col gap-4'>
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map(size => (
        <div key={size}>
          <h3 className='mb-2 text-lg font-semibold'>{size.toUpperCase()}</h3>
          <Template size={size} />
        </div>
      ))}
    </div>
  ),
};
