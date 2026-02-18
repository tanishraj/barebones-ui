import { type VariantProps } from 'class-variance-authority';
import {
  forwardRef,
  useState,
  useCallback,
  createContext,
  useContext,
  ReactNode,
} from 'react';

import { tabsStyles, tabStyles, tabContentStyles } from './Tab.styles';
import { cn } from '../../utils';

type TabsStyleVariants = VariantProps<typeof tabsStyles>;
type TabsVariant = NonNullable<TabsStyleVariants['variant']>;
type TabsSize = NonNullable<TabsStyleVariants['size']>;

type TabsStyleProps = {
  variant?: TabsVariant;
  size?: TabsSize;
};

// Context for managing tab state
interface TabContextValue {
  activeTab: string | number;
  setActiveTab: (value: string | number) => void;
  variant?: TabsVariant;
  size?: TabsSize;
}

const TabContext = createContext<TabContextValue | undefined>(undefined);

const useTabContext = () => {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error('Tab components must be used within a Tabs component');
  }
  return context;
};

// Tabs Container Component
export type TabsProps = TabsStyleProps & {
  children: ReactNode;
  defaultValue?: string | number;
  value?: string | number;
  onChange?: (value: string | number) => void;
  className?: string;
  orientation?: 'horizontal' | 'vertical';
};

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      children,
      defaultValue,
      value,
      onChange,
      className,
      variant = 'default',
      size,
      orientation = 'horizontal',
      ...props
    },
    ref,
  ) => {
    const [uncontrolledActiveTab, setUncontrolledActiveTab] = useState<
      string | number
    >(value ?? defaultValue ?? 0);
    const activeTab = value ?? uncontrolledActiveTab;

    const setActiveTab = useCallback(
      (newValue: string | number) => {
        if (value === undefined) {
          setUncontrolledActiveTab(newValue);
        }
        onChange?.(newValue);
      },
      [value, onChange],
    );

    const normalizedVariant = variant ?? 'default';
    const normalizedSize = size ?? undefined;

    const tabsClassName = cn(
      tabsStyles({ variant: normalizedVariant, size: normalizedSize }),
      orientation === 'vertical' && 'flex-col items-stretch',
      className,
    );

    return (
      <TabContext.Provider
        value={{
          activeTab,
          setActiveTab,
          variant: normalizedVariant,
          size: normalizedSize,
        }}
      >
        <div ref={ref} role='tablist' className={tabsClassName} {...props}>
          {children}
        </div>
      </TabContext.Provider>
    );
  },
);

Tabs.displayName = 'Tabs';

// Tab List Component (optional wrapper for tabs)
export type TabListProps = {
  children: ReactNode;
  className?: string;
};

export const TabList = forwardRef<HTMLDivElement, TabListProps>(
  ({ children, className, ...props }, ref) => {
    const { variant } = useTabContext();

    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center',
          variant === 'lifted' && 'gap-0.5',
          variant !== 'lifted' && 'gap-2',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

TabList.displayName = 'TabList';

// Individual Tab Component
export type TabProps = VariantProps<typeof tabStyles> & {
  children: ReactNode;
  value?: string | number;
  disabled?: boolean;
  className?: string;
  icon?: ReactNode;
  onClick?: () => void;
};

export const Tab = forwardRef<HTMLButtonElement, TabProps>(
  ({ children, value, disabled, className, icon, onClick, ...props }, ref) => {
    const { activeTab, setActiveTab } = useTabContext();
    const tabValue = value ?? children?.toString() ?? '';
    const isActive = activeTab === tabValue;

    const handleClick = useCallback(() => {
      if (!disabled) {
        setActiveTab(tabValue);
        onClick?.();
      }
    }, [disabled, setActiveTab, tabValue, onClick]);

    const tabClassName = cn(
      tabStyles({ active: isActive, disabled }),
      className,
    );

    return (
      <button
        ref={ref}
        role='tab'
        type='button'
        aria-selected={isActive}
        aria-disabled={disabled}
        disabled={disabled}
        className={tabClassName}
        onClick={handleClick}
        {...props}
      >
        {icon && <span className='mr-2 inline-flex items-center'>{icon}</span>}
        {children}
      </button>
    );
  },
);

Tab.displayName = 'Tab';

// Tab Panels Container
export type TabPanelsProps = {
  children: ReactNode;
  className?: string;
};

export const TabPanels = forwardRef<HTMLDivElement, TabPanelsProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('mt-4', className)} {...props}>
        {children}
      </div>
    );
  },
);

TabPanels.displayName = 'TabPanels';

// Individual Tab Panel Component
export type TabPanelProps = {
  children: ReactNode;
  value?: string | number;
  className?: string;
  keepMounted?: boolean;
};

export const TabPanel = forwardRef<HTMLDivElement, TabPanelProps>(
  ({ children, value, className, keepMounted = false, ...props }, ref) => {
    const { activeTab } = useTabContext();
    const panelValue = value ?? children?.toString() ?? '';
    const isVisible = activeTab === panelValue;

    if (!isVisible && !keepMounted) {
      return null;
    }

    const panelClassName = cn(
      tabContentStyles({ visible: isVisible }),
      'p-6 bg-base-100 rounded-lg',
      className,
    );

    return (
      <div
        ref={ref}
        role='tabpanel'
        aria-hidden={!isVisible}
        className={panelClassName}
        {...props}
      >
        {children}
      </div>
    );
  },
);

TabPanel.displayName = 'TabPanel';

// Simplified Tabs Component for basic use cases
export type SimpleTabItem = {
  label: string;
  value?: string | number;
  content: ReactNode;
  disabled?: boolean;
  icon?: ReactNode;
};

export type SimpleTabsProps = TabsStyleProps & {
  items: SimpleTabItem[];
  defaultValue?: string | number;
  value?: string | number;
  onChange?: (value: string | number) => void;
  className?: string;
  tabClassName?: string;
  panelClassName?: string;
  orientation?: 'horizontal' | 'vertical';
};

export const SimpleTabs = forwardRef<HTMLDivElement, SimpleTabsProps>(
  (
    {
      items,
      defaultValue,
      value,
      onChange,
      className,
      tabClassName,
      panelClassName,
      variant,
      size,
      orientation = 'horizontal',
      ...props
    },
    ref,
  ) => {
    const defaultVal =
      defaultValue ?? value ?? items[0]?.value ?? items[0]?.label ?? 0;

    return (
      <div className={cn('w-full', className)} ref={ref} {...props}>
        <Tabs
          defaultValue={defaultVal}
          value={value}
          onChange={onChange}
          variant={variant}
          size={size}
          orientation={orientation}
        >
          <TabList
            className={orientation === 'vertical' ? 'flex-col w-48' : ''}
          >
            {items.map((item, index) => (
              <Tab
                key={item.value ?? item.label ?? index}
                value={item.value ?? item.label}
                disabled={item.disabled}
                icon={item.icon}
                className={tabClassName}
              >
                {item.label}
              </Tab>
            ))}
          </TabList>

          <TabPanels
            className={orientation === 'vertical' ? 'flex-1 ml-4' : ''}
          >
            {items.map((item, index) => (
              <TabPanel
                key={item.value ?? item.label ?? index}
                value={item.value ?? item.label}
                className={panelClassName}
              >
                {item.content}
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </div>
    );
  },
);

SimpleTabs.displayName = 'SimpleTabs';
