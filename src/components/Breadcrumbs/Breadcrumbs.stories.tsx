import type { Meta, StoryObj } from '@storybook/react';

import Breadcrumbs, { BreadcrumbsItem } from './Breadcrumbs';

const HomeIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    className={className}
    role='img'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
      d='M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z'
    />
  </svg>
);

const FolderIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    className={className}
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
      d='M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z'
    />
  </svg>
);

const AddDocumentIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    className={className}
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
      d='M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
    />
  </svg>
);

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Components/Breadcrumb',
  component: Breadcrumbs,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    maxWidth: {
      control: { type: 'text' },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Breadcrumbs>;

const defaultItems: BreadcrumbsItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Documents', href: '/documents' },
  { label: 'Add Document' },
];

const itemsWithIcons: BreadcrumbsItem[] = [
  {
    label: 'Home',
    href: '/',
    icon: <HomeIcon className='h-4 w-4 stroke-current' />,
  },
  {
    label: 'Documents',
    href: '/documents',
    icon: <FolderIcon className='h-4 w-4 stroke-current' />,
  },
  {
    label: 'Add Document',
    icon: <AddDocumentIcon className='h-4 w-4 stroke-current' />,
  },
];

const longItems: BreadcrumbsItem[] = [
  { label: 'Long text 1' },
  { label: 'Long text 2' },
  { label: 'Long text 3' },
  { label: 'Long text 4' },
  { label: 'Long text 5' },
];

export const Default: Story = {
  args: {
    items: defaultItems,
  },
};

export const WithIcons: Story = {
  args: {
    items: itemsWithIcons,
  },
};

export const WithMaxWidth: Story = {
  args: {
    items: longItems,
    maxWidth: 'max-w-xs',
  },
};
