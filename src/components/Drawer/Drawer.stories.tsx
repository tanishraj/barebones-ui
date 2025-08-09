import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Drawer, DrawerToggle } from './Drawer';
import { Button } from '../Button';

const meta = {
  title: 'Components/Drawer',
  component: Drawer,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Position of the drawer',
    },
    responsive: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl'],
      description: 'Responsive behavior for always-open drawer',
    },
    sideWidth: {
      control: 'text',
      description: 'Width of the drawer sidebar',
    },
    open: {
      control: 'boolean',
      description: 'Controlled open state',
    },
  },
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

const SidebarMenu = () => (
  <ul className='menu p-4'>
    <li>
      <a>Dashboard</a>
    </li>
    <li>
      <a>Projects</a>
    </li>
    <li>
      <details>
        <summary>Settings</summary>
        <ul>
          <li>
            <a>Profile</a>
          </li>
          <li>
            <a>Security</a>
          </li>
          <li>
            <a>Billing</a>
          </li>
        </ul>
      </details>
    </li>
    <li>
      <a>Logout</a>
    </li>
  </ul>
);

export const Default: Story = {
  args: {
    id: 'drawer-default',
    sideWidth: 'w-80',
  },
  render: args => (
    <Drawer {...args} sideContent={<SidebarMenu />}>
      <div className='flex min-h-screen flex-col'>
        <div className='navbar bg-base-100'>
          <div className='flex-none'>
            <DrawerToggle drawerId={args.id} className='btn btn-ghost btn-sm'>
              ☰
            </DrawerToggle>
          </div>
          <div className='flex-1'>
            <a className='btn btn-ghost text-xl'>My Application</a>
          </div>
        </div>
        <div className='flex-1 p-6'>
          <h1 className='text-3xl font-bold'>Welcome to the Application</h1>
          <p className='mt-4'>
            Click the menu button to open the drawer. The drawer slides in from
            the left side by default.
          </p>
        </div>
      </div>
    </Drawer>
  ),
};

export const RightSide: Story = {
  args: {
    id: 'drawer-right',
    position: 'right',
    sideWidth: 'w-80',
  },
  render: args => (
    <Drawer {...args} sideContent={<SidebarMenu />}>
      <div className='flex min-h-screen flex-col'>
        <div className='navbar bg-base-100'>
          <div className='flex-1'>
            <a className='btn btn-ghost text-xl'>Right Drawer Example</a>
          </div>
          <div className='flex-none'>
            <DrawerToggle drawerId={args.id} className='btn btn-ghost btn-sm'>
              ☰
            </DrawerToggle>
          </div>
        </div>
        <div className='flex-1 p-6'>
          <h1 className='text-3xl font-bold'>Right-side Drawer</h1>
          <p className='mt-4'>
            This drawer opens from the right side of the screen.
          </p>
        </div>
      </div>
    </Drawer>
  ),
};

export const Responsive: Story = {
  args: {
    id: 'drawer-responsive',
    responsive: 'lg',
    sideWidth: 'w-80',
  },
  render: args => (
    <Drawer {...args} sideContent={<SidebarMenu />}>
      <div className='flex min-h-screen flex-col'>
        <div className='navbar bg-base-100 lg:hidden'>
          <div className='flex-none'>
            <DrawerToggle drawerId={args.id} className='btn btn-ghost btn-sm'>
              ☰
            </DrawerToggle>
          </div>
          <div className='flex-1'>
            <a className='btn btn-ghost text-xl'>Responsive Drawer</a>
          </div>
        </div>
        <div className='flex-1 p-6'>
          <h1 className='text-3xl font-bold'>Responsive Drawer</h1>
          <p className='mt-4'>
            This drawer is always open on large screens (lg and above) and
            toggleable on smaller screens.
          </p>
          <p className='mt-2'>
            Resize your browser window to see the responsive behavior.
          </p>
        </div>
      </div>
    </Drawer>
  ),
};

export const Controlled: Story = {
  args: {
    id: 'drawer-controlled',
  },
  render: () => {
    const ControlledExample = () => {
      const [isOpen, setIsOpen] = useState(false);

      return (
        <Drawer
          id='drawer-controlled'
          open={isOpen}
          onOpenChange={setIsOpen}
          sideContent={<SidebarMenu />}
        >
          <div className='flex min-h-screen flex-col'>
            <div className='navbar bg-base-100'>
              <div className='flex-none'>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={() => setIsOpen(!isOpen)}
                >
                  ☰
                </Button>
              </div>
              <div className='flex-1'>
                <a className='btn btn-ghost text-xl'>Controlled Drawer</a>
              </div>
            </div>
            <div className='flex-1 p-6'>
              <h1 className='text-3xl font-bold'>Controlled Drawer</h1>
              <p className='mt-4'>
                This drawer is controlled via React state. Current state:{' '}
                <strong>{isOpen ? 'Open' : 'Closed'}</strong>
              </p>
              <div className='mt-4 space-x-2'>
                <Button variant='primary' onClick={() => setIsOpen(true)}>
                  Open Drawer
                </Button>
                <Button variant='secondary' onClick={() => setIsOpen(false)}>
                  Close Drawer
                </Button>
              </div>
            </div>
          </div>
        </Drawer>
      );
    };

    return <ControlledExample />;
  },
};

export const WithNavbar: Story = {
  args: {
    id: 'drawer-navbar',
    sideWidth: 'w-64',
  },
  render: args => (
    <Drawer
      {...args}
      sideContent={
        <div className='p-4'>
          <h3 className='mb-4 text-lg font-bold'>Navigation</h3>
          <SidebarMenu />
        </div>
      }
    >
      <div className='flex min-h-screen flex-col'>
        <div className='navbar bg-primary text-primary-content'>
          <div className='flex-none'>
            <DrawerToggle drawerId={args.id} className='btn btn-ghost btn-sm'>
              ☰
            </DrawerToggle>
          </div>
          <div className='flex-1'>
            <a className='btn btn-ghost text-xl'>Company Logo</a>
          </div>
          <div className='flex-none'>
            <Button variant='ghost' size='sm'>
              Profile
            </Button>
          </div>
        </div>
        <div className='flex-1 bg-base-200 p-6'>
          <div className='card bg-base-100 shadow-xl'>
            <div className='card-body'>
              <h2 className='card-title'>Dashboard</h2>
              <p>Welcome to your dashboard. Use the sidebar to navigate.</p>
              <div className='card-actions justify-end'>
                <Button variant='primary'>Get Started</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  ),
};

export const CustomContent: Story = {
  args: {
    id: 'drawer-custom',
    sideWidth: 'w-96',
  },
  render: args => (
    <Drawer
      {...args}
      sideContent={
        <div className='flex h-full flex-col p-4'>
          <h2 className='mb-4 text-2xl font-bold'>Filters</h2>
          <div className='space-y-4'>
            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>Category</span>
              </label>
              <select className='select select-bordered w-full'>
                <option>All Categories</option>
                <option>Electronics</option>
                <option>Clothing</option>
                <option>Books</option>
              </select>
            </div>
            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>Price Range</span>
              </label>
              <input
                type='range'
                min='0'
                max='1000'
                className='range'
                step='25'
              />
              <div className='flex w-full justify-between px-2 text-xs'>
                <span>$0</span>
                <span>$500</span>
                <span>$1000</span>
              </div>
            </div>
            <div className='form-control'>
              <label className='label cursor-pointer'>
                <span className='label-text'>In Stock Only</span>
                <input type='checkbox' className='checkbox' />
              </label>
            </div>
            <div className='form-control'>
              <label className='label cursor-pointer'>
                <span className='label-text'>Free Shipping</span>
                <input type='checkbox' className='checkbox' />
              </label>
            </div>
          </div>
          <div className='mt-auto space-y-2'>
            <Button variant='primary' layout='block'>
              Apply Filters
            </Button>
            <Button variant='ghost' layout='block'>
              Reset
            </Button>
          </div>
        </div>
      }
    >
      <div className='flex min-h-screen flex-col'>
        <div className='navbar bg-base-100'>
          <div className='flex-none'>
            <DrawerToggle drawerId={args.id} className='btn btn-ghost btn-sm'>
              🔍 Filters
            </DrawerToggle>
          </div>
          <div className='flex-1'>
            <a className='btn btn-ghost text-xl'>Product Catalog</a>
          </div>
        </div>
        <div className='flex-1 bg-base-200 p-6'>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className='card bg-base-100 shadow-xl'>
                <div className='card-body'>
                  <h2 className='card-title'>Product {i}</h2>
                  <p>This is a sample product description.</p>
                  <div className='card-actions justify-end'>
                    <Button variant='primary' size='sm'>
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Drawer>
  ),
};
