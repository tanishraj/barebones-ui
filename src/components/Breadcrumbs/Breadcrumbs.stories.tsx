import type { Meta, StoryObj } from '@storybook/react';
import {
  Home02 as HomeIcon,
  Folder as FolderIcon,
  FilePlus03 as AddDocumentIcon,
} from '@untitled-ui/icons-react';

import Breadcrumbs, { BreadcrumbsItem } from './Breadcrumbs';

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
