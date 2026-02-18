import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import { Tabs, Tab, TabList, TabPanels, TabPanel, SimpleTabs } from './Tab';

describe('Tab Components', () => {
  describe('Tabs', () => {
    it('renders tabs and panels correctly', () => {
      render(
        <Tabs defaultValue='tab1'>
          <TabList>
            <Tab value='tab1'>Tab 1</Tab>
            <Tab value='tab2'>Tab 2</Tab>
          </TabList>
          <TabPanels>
            <TabPanel value='tab1'>Content 1</TabPanel>
            <TabPanel value='tab2'>Content 2</TabPanel>
          </TabPanels>
        </Tabs>,
      );

      expect(screen.getByText('Tab 1')).toBeInTheDocument();
      expect(screen.getByText('Tab 2')).toBeInTheDocument();
      expect(screen.getByText('Content 1')).toBeInTheDocument();
      expect(screen.queryByText('Content 2')).not.toBeInTheDocument();
    });

    it('shows correct panel based on defaultValue', () => {
      render(
        <Tabs defaultValue='tab2'>
          <TabList>
            <Tab value='tab1'>Tab 1</Tab>
            <Tab value='tab2'>Tab 2</Tab>
          </TabList>
          <TabPanels>
            <TabPanel value='tab1'>Content 1</TabPanel>
            <TabPanel value='tab2'>Content 2</TabPanel>
          </TabPanels>
        </Tabs>,
      );

      expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
      expect(screen.getByText('Content 2')).toBeInTheDocument();
    });

    it('switches tabs when clicked', async () => {
      render(
        <Tabs defaultValue='tab1'>
          <TabList>
            <Tab value='tab1'>Tab 1</Tab>
            <Tab value='tab2'>Tab 2</Tab>
          </TabList>
          <TabPanels>
            <TabPanel value='tab1'>Content 1</TabPanel>
            <TabPanel value='tab2'>Content 2</TabPanel>
          </TabPanels>
        </Tabs>,
      );

      expect(screen.getByText('Content 1')).toBeInTheDocument();
      expect(screen.queryByText('Content 2')).not.toBeInTheDocument();

      await userEvent.click(screen.getByText('Tab 2'));

      expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
      expect(screen.getByText('Content 2')).toBeInTheDocument();
    });

    it('applies variant classes correctly', () => {
      const { container } = render(
        <Tabs defaultValue='tab1' variant='boxed'>
          <TabList>
            <Tab value='tab1'>Tab 1</Tab>
          </TabList>
        </Tabs>,
      );

      const tabsElement = container.querySelector('.tabs');
      expect(tabsElement).toHaveClass('tabs-boxed');
    });

    it('applies size classes correctly', () => {
      const { container } = render(
        <Tabs defaultValue='tab1' size='lg'>
          <TabList>
            <Tab value='tab1'>Tab 1</Tab>
          </TabList>
        </Tabs>,
      );

      const tabsElement = container.querySelector('.tabs');
      expect(tabsElement).toHaveClass('tabs-lg');
    });

    it('handles controlled component correctly', () => {
      const handleChange = vi.fn();
      const { rerender } = render(
        <Tabs value='tab1' onChange={handleChange}>
          <TabList>
            <Tab value='tab1'>Tab 1</Tab>
            <Tab value='tab2'>Tab 2</Tab>
          </TabList>
          <TabPanels>
            <TabPanel value='tab1'>Content 1</TabPanel>
            <TabPanel value='tab2'>Content 2</TabPanel>
          </TabPanels>
        </Tabs>,
      );

      expect(screen.getByText('Content 1')).toBeInTheDocument();

      fireEvent.click(screen.getByText('Tab 2'));
      expect(handleChange).toHaveBeenCalledWith('tab2');

      rerender(
        <Tabs value='tab2' onChange={handleChange}>
          <TabList>
            <Tab value='tab1'>Tab 1</Tab>
            <Tab value='tab2'>Tab 2</Tab>
          </TabList>
          <TabPanels>
            <TabPanel value='tab1'>Content 1</TabPanel>
            <TabPanel value='tab2'>Content 2</TabPanel>
          </TabPanels>
        </Tabs>,
      );

      expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
      expect(screen.getByText('Content 2')).toBeInTheDocument();
    });
  });

  describe('Tab', () => {
    it('renders tab with children', () => {
      render(
        <Tabs defaultValue='tab1'>
          <TabList>
            <Tab value='tab1'>Tab Label</Tab>
          </TabList>
        </Tabs>,
      );

      expect(screen.getByText('Tab Label')).toBeInTheDocument();
    });

    it('applies active class to active tab', () => {
      render(
        <Tabs defaultValue='tab1'>
          <TabList>
            <Tab value='tab1'>Active Tab</Tab>
            <Tab value='tab2'>Inactive Tab</Tab>
          </TabList>
        </Tabs>,
      );

      const activeTab = screen.getByText('Active Tab');
      const inactiveTab = screen.getByText('Inactive Tab');

      expect(activeTab).toHaveClass('tab-active');
      expect(inactiveTab).not.toHaveClass('tab-active');
    });

    it('handles disabled state', () => {
      render(
        <Tabs defaultValue='tab1'>
          <TabList>
            <Tab value='tab1'>Tab 1</Tab>
            <Tab value='tab2' disabled>
              Disabled Tab
            </Tab>
          </TabList>
        </Tabs>,
      );

      const disabledTab = screen.getByText('Disabled Tab');
      expect(disabledTab).toHaveClass('tab-disabled');
      expect(disabledTab).toBeDisabled();
    });

    it('does not switch to disabled tab when clicked', () => {
      render(
        <Tabs defaultValue='tab1'>
          <TabList>
            <Tab value='tab1'>Tab 1</Tab>
            <Tab value='tab2' disabled>
              Disabled Tab
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel value='tab1'>Content 1</TabPanel>
            <TabPanel value='tab2'>Content 2</TabPanel>
          </TabPanels>
        </Tabs>,
      );

      fireEvent.click(screen.getByText('Disabled Tab'));

      expect(screen.getByText('Content 1')).toBeInTheDocument();
      expect(screen.queryByText('Content 2')).not.toBeInTheDocument();
    });

    it('renders with icon', () => {
      render(
        <Tabs defaultValue='tab1'>
          <TabList>
            <Tab value='tab1' icon={<span data-testid='tab-icon'>📋</span>}>
              Tab with Icon
            </Tab>
          </TabList>
        </Tabs>,
      );

      expect(screen.getByTestId('tab-icon')).toBeInTheDocument();
      expect(screen.getByText('Tab with Icon')).toBeInTheDocument();
    });

    it('calls onClick handler when clicked', () => {
      const handleClick = vi.fn();

      render(
        <Tabs defaultValue='tab1'>
          <TabList>
            <Tab value='tab1' onClick={handleClick}>
              Tab 1
            </Tab>
          </TabList>
        </Tabs>,
      );

      fireEvent.click(screen.getByText('Tab 1'));
      expect(handleClick).toHaveBeenCalled();
    });

    it('has correct ARIA attributes', () => {
      render(
        <Tabs defaultValue='tab1'>
          <TabList>
            <Tab value='tab1'>Active Tab</Tab>
            <Tab value='tab2'>Inactive Tab</Tab>
            <Tab value='tab3' disabled>
              Disabled Tab
            </Tab>
          </TabList>
        </Tabs>,
      );

      const activeTab = screen.getByText('Active Tab');
      const inactiveTab = screen.getByText('Inactive Tab');
      const disabledTab = screen.getByText('Disabled Tab');

      expect(activeTab).toHaveAttribute('role', 'tab');
      expect(activeTab).toHaveAttribute('aria-selected', 'true');

      expect(inactiveTab).toHaveAttribute('role', 'tab');
      expect(inactiveTab).toHaveAttribute('aria-selected', 'false');

      expect(disabledTab).toHaveAttribute('aria-disabled', 'true');
    });
  });

  describe('TabPanel', () => {
    it('renders panel content when active', () => {
      render(
        <Tabs defaultValue='tab1'>
          <TabPanels>
            <TabPanel value='tab1'>Panel Content</TabPanel>
          </TabPanels>
        </Tabs>,
      );

      expect(screen.getByText('Panel Content')).toBeInTheDocument();
    });

    it('does not render panel content when inactive', () => {
      render(
        <Tabs defaultValue='tab1'>
          <TabPanels>
            <TabPanel value='tab1'>Active Panel</TabPanel>
            <TabPanel value='tab2'>Inactive Panel</TabPanel>
          </TabPanels>
        </Tabs>,
      );

      expect(screen.getByText('Active Panel')).toBeInTheDocument();
      expect(screen.queryByText('Inactive Panel')).not.toBeInTheDocument();
    });

    it('keeps panel mounted when keepMounted is true', () => {
      render(
        <Tabs defaultValue='tab1'>
          <TabPanels>
            <TabPanel value='tab1'>Active Panel</TabPanel>
            <TabPanel value='tab2' keepMounted>
              Kept Mounted Panel
            </TabPanel>
          </TabPanels>
        </Tabs>,
      );

      expect(screen.getByText('Active Panel')).toBeInTheDocument();
      expect(screen.getByText('Kept Mounted Panel')).toBeInTheDocument();
      expect(screen.getByText('Kept Mounted Panel')).toHaveClass('hidden');
    });

    it('has correct ARIA attributes', () => {
      render(
        <Tabs defaultValue='tab1'>
          <TabPanels>
            <TabPanel value='tab1'>Active Panel</TabPanel>
            <TabPanel value='tab2' keepMounted>
              Inactive Panel
            </TabPanel>
          </TabPanels>
        </Tabs>,
      );

      const activePanel = screen
        .getByText('Active Panel')
        .closest('[role="tabpanel"]');
      const inactivePanel = screen
        .getByText('Inactive Panel')
        .closest('[role="tabpanel"]');

      expect(activePanel).toHaveAttribute('role', 'tabpanel');
      expect(activePanel).toHaveAttribute('aria-hidden', 'false');

      expect(inactivePanel).toHaveAttribute('role', 'tabpanel');
      expect(inactivePanel).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('SimpleTabs', () => {
    const items = [
      { label: 'Tab 1', value: 'tab1', content: 'Content 1' },
      { label: 'Tab 2', value: 'tab2', content: 'Content 2' },
      { label: 'Tab 3', value: 'tab3', content: 'Content 3', disabled: true },
    ];

    it('renders all tabs from items', () => {
      render(<SimpleTabs items={items} />);

      expect(screen.getByText('Tab 1')).toBeInTheDocument();
      expect(screen.getByText('Tab 2')).toBeInTheDocument();
      expect(screen.getByText('Tab 3')).toBeInTheDocument();
    });

    it('shows first tab content by default', () => {
      render(<SimpleTabs items={items} />);

      expect(screen.getByText('Content 1')).toBeInTheDocument();
      expect(screen.queryByText('Content 2')).not.toBeInTheDocument();
      expect(screen.queryByText('Content 3')).not.toBeInTheDocument();
    });

    it('switches content when tab is clicked', async () => {
      render(<SimpleTabs items={items} />);

      await userEvent.click(screen.getByText('Tab 2'));

      expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
      expect(screen.getByText('Content 2')).toBeInTheDocument();
    });

    it('respects defaultValue prop', () => {
      render(<SimpleTabs items={items} defaultValue='tab2' />);

      expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
      expect(screen.getByText('Content 2')).toBeInTheDocument();
    });

    it('handles disabled tabs', () => {
      render(<SimpleTabs items={items} />);

      const disabledTab = screen.getByText('Tab 3');
      expect(disabledTab).toBeDisabled();

      fireEvent.click(disabledTab);
      expect(screen.queryByText('Content 3')).not.toBeInTheDocument();
    });

    it('renders tab icons', () => {
      const itemsWithIcons = [
        {
          label: 'Tab with Icon',
          content: 'Content',
          icon: <span data-testid='tab-icon'>🏠</span>,
        },
      ];

      render(<SimpleTabs items={itemsWithIcons} />);

      expect(screen.getByTestId('tab-icon')).toBeInTheDocument();
    });

    it('handles onChange callback', () => {
      const handleChange = vi.fn();

      render(<SimpleTabs items={items} onChange={handleChange} />);

      fireEvent.click(screen.getByText('Tab 2'));
      expect(handleChange).toHaveBeenCalledWith('tab2');
    });

    it('applies variant and size props', () => {
      const { container } = render(
        <SimpleTabs items={items} variant='boxed' size='lg' />,
      );

      const tabsElement = container.querySelector('.tabs');
      expect(tabsElement).toHaveClass('tabs-boxed', 'tabs-lg');
    });
  });

  describe('Vertical Tabs', () => {
    it('applies vertical orientation styles', () => {
      const { container } = render(
        <Tabs defaultValue='tab1' orientation='vertical'>
          <TabList>
            <Tab value='tab1'>Tab 1</Tab>
            <Tab value='tab2'>Tab 2</Tab>
          </TabList>
        </Tabs>,
      );

      const tabsElement = container.querySelector('.tabs');
      expect(tabsElement).toHaveClass('flex-col', 'items-stretch');
    });
  });
});
