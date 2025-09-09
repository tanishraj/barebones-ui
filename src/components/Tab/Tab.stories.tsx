import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Tabs, Tab, TabList, TabPanels, TabPanel, SimpleTabs } from './Tab';
import { 
  Home, User, Settings, Bell, Mail, Heart, Star, ShoppingCart, 
  FileText, Image, Music, Video, Download, Upload, Trash, Edit 
} from 'lucide-react';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tab',
  component: Tabs,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Tab component based on DaisyUI with various styles, sizes, and orientations.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'boxed', 'bordered', 'lifted'],
      description: 'Visual style of the tabs',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size of the tabs',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Orientation of the tabs',
    },
    defaultValue: {
      control: 'text',
      description: 'Default active tab value',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue='tab1'>
      <TabList>
        <Tab value='tab1'>Tab 1</Tab>
        <Tab value='tab2'>Tab 2</Tab>
        <Tab value='tab3'>Tab 3</Tab>
      </TabList>
      <TabPanels>
        <TabPanel value='tab1'>
          <h3 className='text-lg font-semibold mb-2'>First Tab Content</h3>
          <p>This is the content of the first tab.</p>
        </TabPanel>
        <TabPanel value='tab2'>
          <h3 className='text-lg font-semibold mb-2'>Second Tab Content</h3>
          <p>This is the content of the second tab.</p>
        </TabPanel>
        <TabPanel value='tab3'>
          <h3 className='text-lg font-semibold mb-2'>Third Tab Content</h3>
          <p>This is the content of the third tab.</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className='space-y-8'>
      <div>
        <h3 className='text-sm font-semibold mb-2'>Default</h3>
        <Tabs defaultValue='tab1' variant='default'>
          <TabList>
            <Tab value='tab1'>Tab 1</Tab>
            <Tab value='tab2'>Tab 2</Tab>
            <Tab value='tab3'>Tab 3</Tab>
          </TabList>
          <TabPanels>
            <TabPanel value='tab1'>Default style content</TabPanel>
            <TabPanel value='tab2'>Second tab content</TabPanel>
            <TabPanel value='tab3'>Third tab content</TabPanel>
          </TabPanels>
        </Tabs>
      </div>

      <div>
        <h3 className='text-sm font-semibold mb-2'>Boxed</h3>
        <Tabs defaultValue='tab1' variant='boxed'>
          <TabList>
            <Tab value='tab1'>Tab 1</Tab>
            <Tab value='tab2'>Tab 2</Tab>
            <Tab value='tab3'>Tab 3</Tab>
          </TabList>
          <TabPanels>
            <TabPanel value='tab1'>Boxed style content</TabPanel>
            <TabPanel value='tab2'>Second tab content</TabPanel>
            <TabPanel value='tab3'>Third tab content</TabPanel>
          </TabPanels>
        </Tabs>
      </div>

      <div>
        <h3 className='text-sm font-semibold mb-2'>Bordered</h3>
        <Tabs defaultValue='tab1' variant='bordered'>
          <TabList>
            <Tab value='tab1'>Tab 1</Tab>
            <Tab value='tab2'>Tab 2</Tab>
            <Tab value='tab3'>Tab 3</Tab>
          </TabList>
          <TabPanels>
            <TabPanel value='tab1'>Bordered style content</TabPanel>
            <TabPanel value='tab2'>Second tab content</TabPanel>
            <TabPanel value='tab3'>Third tab content</TabPanel>
          </TabPanels>
        </Tabs>
      </div>

      <div>
        <h3 className='text-sm font-semibold mb-2'>Lifted</h3>
        <Tabs defaultValue='tab1' variant='lifted'>
          <TabList>
            <Tab value='tab1'>Tab 1</Tab>
            <Tab value='tab2'>Tab 2</Tab>
            <Tab value='tab3'>Tab 3</Tab>
          </TabList>
          <TabPanels>
            <TabPanel value='tab1'>Lifted style content</TabPanel>
            <TabPanel value='tab2'>Second tab content</TabPanel>
            <TabPanel value='tab3'>Third tab content</TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className='space-y-8'>
      <Tabs defaultValue='tab1' size='xs' variant='boxed'>
        <TabList>
          <Tab value='tab1'>Extra Small</Tab>
          <Tab value='tab2'>Tab 2</Tab>
          <Tab value='tab3'>Tab 3</Tab>
        </TabList>
      </Tabs>

      <Tabs defaultValue='tab1' size='sm' variant='boxed'>
        <TabList>
          <Tab value='tab1'>Small</Tab>
          <Tab value='tab2'>Tab 2</Tab>
          <Tab value='tab3'>Tab 3</Tab>
        </TabList>
      </Tabs>

      <Tabs defaultValue='tab1' size='md' variant='boxed'>
        <TabList>
          <Tab value='tab1'>Medium (Default)</Tab>
          <Tab value='tab2'>Tab 2</Tab>
          <Tab value='tab3'>Tab 3</Tab>
        </TabList>
      </Tabs>

      <Tabs defaultValue='tab1' size='lg' variant='boxed'>
        <TabList>
          <Tab value='tab1'>Large</Tab>
          <Tab value='tab2'>Tab 2</Tab>
          <Tab value='tab3'>Tab 3</Tab>
        </TabList>
      </Tabs>

      <Tabs defaultValue='tab1' size='xl' variant='boxed'>
        <TabList>
          <Tab value='tab1'>Extra Large</Tab>
          <Tab value='tab2'>Tab 2</Tab>
          <Tab value='tab3'>Tab 3</Tab>
        </TabList>
      </Tabs>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Tabs defaultValue='home' variant='boxed'>
      <TabList>
        <Tab value='home' icon={<Home className='h-4 w-4' />}>Home</Tab>
        <Tab value='profile' icon={<User className='h-4 w-4' />}>Profile</Tab>
        <Tab value='settings' icon={<Settings className='h-4 w-4' />}>Settings</Tab>
        <Tab value='notifications' icon={<Bell className='h-4 w-4' />}>Notifications</Tab>
      </TabList>
      <TabPanels>
        <TabPanel value='home'>
          <h3 className='text-lg font-semibold mb-2'>Home</h3>
          <p>Welcome to your dashboard.</p>
        </TabPanel>
        <TabPanel value='profile'>
          <h3 className='text-lg font-semibold mb-2'>Profile</h3>
          <p>Manage your profile information here.</p>
        </TabPanel>
        <TabPanel value='settings'>
          <h3 className='text-lg font-semibold mb-2'>Settings</h3>
          <p>Configure your application settings.</p>
        </TabPanel>
        <TabPanel value='notifications'>
          <h3 className='text-lg font-semibold mb-2'>Notifications</h3>
          <p>View and manage your notifications.</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  ),
};

export const DisabledTabs: Story = {
  render: () => (
    <Tabs defaultValue='tab1' variant='bordered'>
      <TabList>
        <Tab value='tab1'>Active Tab</Tab>
        <Tab value='tab2' disabled>Disabled Tab</Tab>
        <Tab value='tab3'>Another Active</Tab>
        <Tab value='tab4' disabled>Another Disabled</Tab>
      </TabList>
      <TabPanels>
        <TabPanel value='tab1'>This tab is active and clickable.</TabPanel>
        <TabPanel value='tab3'>This is another active tab.</TabPanel>
      </TabPanels>
    </Tabs>
  ),
};

export const ControlledTabs: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState('tab2');

    return (
      <div className='space-y-4'>
        <div className='flex gap-2'>
          <button 
            className='btn btn-sm'
            onClick={() => setActiveTab('tab1')}
          >
            Go to Tab 1
          </button>
          <button 
            className='btn btn-sm'
            onClick={() => setActiveTab('tab2')}
          >
            Go to Tab 2
          </button>
          <button 
            className='btn btn-sm'
            onClick={() => setActiveTab('tab3')}
          >
            Go to Tab 3
          </button>
        </div>
        
        <Tabs value={activeTab} onChange={setActiveTab} variant='lifted'>
          <TabList>
            <Tab value='tab1'>Tab 1</Tab>
            <Tab value='tab2'>Tab 2</Tab>
            <Tab value='tab3'>Tab 3</Tab>
          </TabList>
          <TabPanels>
            <TabPanel value='tab1'>Content for Tab 1</TabPanel>
            <TabPanel value='tab2'>Content for Tab 2</TabPanel>
            <TabPanel value='tab3'>Content for Tab 3</TabPanel>
          </TabPanels>
        </Tabs>
        
        <p className='text-sm'>Active tab: <strong>{activeTab}</strong></p>
      </div>
    );
  },
};

export const VerticalTabs: Story = {
  render: () => (
    <div className='flex'>
      <Tabs defaultValue='general' orientation='vertical' variant='bordered'>
        <TabList>
          <Tab value='general'>General</Tab>
          <Tab value='security'>Security</Tab>
          <Tab value='privacy'>Privacy</Tab>
          <Tab value='notifications'>Notifications</Tab>
          <Tab value='account'>Account</Tab>
        </TabList>
        <TabPanels>
          <TabPanel value='general'>
            <h3 className='text-lg font-semibold mb-2'>General Settings</h3>
            <p>Configure general application settings.</p>
          </TabPanel>
          <TabPanel value='security'>
            <h3 className='text-lg font-semibold mb-2'>Security Settings</h3>
            <p>Manage your security preferences.</p>
          </TabPanel>
          <TabPanel value='privacy'>
            <h3 className='text-lg font-semibold mb-2'>Privacy Settings</h3>
            <p>Control your privacy settings.</p>
          </TabPanel>
          <TabPanel value='notifications'>
            <h3 className='text-lg font-semibold mb-2'>Notification Settings</h3>
            <p>Manage notification preferences.</p>
          </TabPanel>
          <TabPanel value='account'>
            <h3 className='text-lg font-semibold mb-2'>Account Settings</h3>
            <p>Manage your account details.</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  ),
};

export const SimpleTabsExample: Story = {
  render: () => {
    const items = [
      {
        label: 'Overview',
        icon: <Home className='h-4 w-4' />,
        content: (
          <div>
            <h3 className='text-lg font-semibold mb-2'>Overview</h3>
            <p>This is the overview section with general information.</p>
          </div>
        ),
      },
      {
        label: 'Analytics',
        icon: <Star className='h-4 w-4' />,
        content: (
          <div>
            <h3 className='text-lg font-semibold mb-2'>Analytics</h3>
            <p>View your analytics and statistics here.</p>
          </div>
        ),
      },
      {
        label: 'Reports',
        icon: <FileText className='h-4 w-4' />,
        content: (
          <div>
            <h3 className='text-lg font-semibold mb-2'>Reports</h3>
            <p>Access and download your reports.</p>
          </div>
        ),
      },
      {
        label: 'Settings',
        icon: <Settings className='h-4 w-4' />,
        disabled: true,
        content: (
          <div>
            <h3 className='text-lg font-semibold mb-2'>Settings</h3>
            <p>This tab is disabled.</p>
          </div>
        ),
      },
    ];

    return <SimpleTabs items={items} variant='boxed' />;
  },
};

export const MediaTabs: Story = {
  render: () => (
    <Tabs defaultValue='images' variant='lifted'>
      <TabList>
        <Tab value='images' icon={<Image className='h-4 w-4' />}>Images</Tab>
        <Tab value='videos' icon={<Video className='h-4 w-4' />}>Videos</Tab>
        <Tab value='music' icon={<Music className='h-4 w-4' />}>Music</Tab>
        <Tab value='documents' icon={<FileText className='h-4 w-4' />}>Documents</Tab>
      </TabList>
      <TabPanels>
        <TabPanel value='images'>
          <div className='grid grid-cols-3 gap-4'>
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className='aspect-square bg-base-200 rounded-lg flex items-center justify-center'>
                <Image className='h-8 w-8 text-base-content/30' />
              </div>
            ))}
          </div>
        </TabPanel>
        <TabPanel value='videos'>
          <div className='grid grid-cols-2 gap-4'>
            {[1, 2, 3, 4].map(i => (
              <div key={i} className='aspect-video bg-base-200 rounded-lg flex items-center justify-center'>
                <Video className='h-8 w-8 text-base-content/30' />
              </div>
            ))}
          </div>
        </TabPanel>
        <TabPanel value='music'>
          <div className='space-y-2'>
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className='p-3 bg-base-200 rounded-lg flex items-center gap-3'>
                <Music className='h-5 w-5 text-base-content/50' />
                <div className='flex-1'>
                  <div className='text-sm font-medium'>Song Title {i}</div>
                  <div className='text-xs text-base-content/60'>Artist Name</div>
                </div>
                <span className='text-xs text-base-content/50'>3:45</span>
              </div>
            ))}
          </div>
        </TabPanel>
        <TabPanel value='documents'>
          <div className='space-y-2'>
            {[1, 2, 3, 4].map(i => (
              <div key={i} className='p-3 bg-base-200 rounded-lg flex items-center gap-3'>
                <FileText className='h-5 w-5 text-base-content/50' />
                <div className='flex-1'>
                  <div className='text-sm font-medium'>Document {i}.pdf</div>
                  <div className='text-xs text-base-content/60'>2.4 MB</div>
                </div>
                <button className='btn btn-ghost btn-xs'>
                  <Download className='h-3 w-3' />
                </button>
              </div>
            ))}
          </div>
        </TabPanel>
      </TabPanels>
    </Tabs>
  ),
};

export const ShoppingTabs: Story = {
  render: () => {
    const [cartCount] = useState(3);
    const [wishlistCount] = useState(5);
    
    return (
      <div className='card bg-base-100 shadow-xl'>
        <div className='card-body'>
          <h2 className='card-title mb-4'>My Shopping</h2>
          
          <Tabs defaultValue='orders' variant='bordered'>
            <TabList>
              <Tab value='orders'>My Orders</Tab>
              <Tab value='cart' icon={
                <div className='relative'>
                  <ShoppingCart className='h-4 w-4' />
                  {cartCount > 0 && (
                    <span className='absolute -top-2 -right-2 badge badge-xs badge-primary'>
                      {cartCount}
                    </span>
                  )}
                </div>
              }>
                Cart
              </Tab>
              <Tab value='wishlist' icon={
                <div className='relative'>
                  <Heart className='h-4 w-4' />
                  {wishlistCount > 0 && (
                    <span className='absolute -top-2 -right-2 badge badge-xs badge-secondary'>
                      {wishlistCount}
                    </span>
                  )}
                </div>
              }>
                Wishlist
              </Tab>
            </TabList>
            
            <TabPanels>
              <TabPanel value='orders'>
                <div className='space-y-3'>
                  <div className='border border-base-300 rounded-lg p-4'>
                    <div className='flex justify-between items-start'>
                      <div>
                        <p className='font-semibold'>Order #12345</p>
                        <p className='text-sm text-base-content/60'>Delivered on Dec 15, 2023</p>
                      </div>
                      <span className='badge badge-success'>Delivered</span>
                    </div>
                  </div>
                  <div className='border border-base-300 rounded-lg p-4'>
                    <div className='flex justify-between items-start'>
                      <div>
                        <p className='font-semibold'>Order #12344</p>
                        <p className='text-sm text-base-content/60'>Expected by Dec 20, 2023</p>
                      </div>
                      <span className='badge badge-warning'>In Transit</span>
                    </div>
                  </div>
                </div>
              </TabPanel>
              
              <TabPanel value='cart'>
                <div className='space-y-3'>
                  {[1, 2, 3].map(i => (
                    <div key={i} className='flex gap-3 p-3 bg-base-200 rounded-lg'>
                      <div className='w-16 h-16 bg-base-300 rounded'></div>
                      <div className='flex-1'>
                        <p className='font-medium'>Product Name {i}</p>
                        <p className='text-sm text-base-content/60'>$29.99</p>
                      </div>
                      <button className='btn btn-ghost btn-sm'>
                        <Trash className='h-4 w-4' />
                      </button>
                    </div>
                  ))}
                  <button className='btn btn-primary w-full'>Checkout</button>
                </div>
              </TabPanel>
              
              <TabPanel value='wishlist'>
                <div className='grid grid-cols-2 gap-3'>
                  {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className='card bg-base-200'>
                      <div className='card-body p-3'>
                        <div className='h-20 bg-base-300 rounded mb-2'></div>
                        <p className='text-sm font-medium'>Item {i}</p>
                        <p className='text-xs text-base-content/60'>$19.99</p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </div>
    );
  },
};

export const FormTabs: Story = {
  render: () => (
    <div className='card bg-base-100 shadow-xl'>
      <div className='card-body'>
        <h2 className='card-title mb-4'>Account Settings</h2>
        
        <Tabs defaultValue='personal' variant='lifted'>
          <TabList>
            <Tab value='personal'>Personal Info</Tab>
            <Tab value='password'>Password</Tab>
            <Tab value='notifications'>Notifications</Tab>
            <Tab value='billing'>Billing</Tab>
          </TabList>
          
          <TabPanels>
            <TabPanel value='personal'>
              <form className='space-y-4'>
                <div className='form-control'>
                  <label className='label'>
                    <span className='label-text'>Full Name</span>
                  </label>
                  <input type='text' className='input input-bordered' placeholder='John Doe' />
                </div>
                <div className='form-control'>
                  <label className='label'>
                    <span className='label-text'>Email</span>
                  </label>
                  <input type='email' className='input input-bordered' placeholder='john@example.com' />
                </div>
                <button className='btn btn-primary'>Save Changes</button>
              </form>
            </TabPanel>
            
            <TabPanel value='password'>
              <form className='space-y-4'>
                <div className='form-control'>
                  <label className='label'>
                    <span className='label-text'>Current Password</span>
                  </label>
                  <input type='password' className='input input-bordered' />
                </div>
                <div className='form-control'>
                  <label className='label'>
                    <span className='label-text'>New Password</span>
                  </label>
                  <input type='password' className='input input-bordered' />
                </div>
                <div className='form-control'>
                  <label className='label'>
                    <span className='label-text'>Confirm Password</span>
                  </label>
                  <input type='password' className='input input-bordered' />
                </div>
                <button className='btn btn-primary'>Update Password</button>
              </form>
            </TabPanel>
            
            <TabPanel value='notifications'>
              <div className='space-y-4'>
                <label className='flex items-center gap-3'>
                  <input type='checkbox' className='checkbox' defaultChecked />
                  <span>Email notifications</span>
                </label>
                <label className='flex items-center gap-3'>
                  <input type='checkbox' className='checkbox' />
                  <span>SMS notifications</span>
                </label>
                <label className='flex items-center gap-3'>
                  <input type='checkbox' className='checkbox' defaultChecked />
                  <span>Push notifications</span>
                </label>
                <button className='btn btn-primary'>Save Preferences</button>
              </div>
            </TabPanel>
            
            <TabPanel value='billing'>
              <div className='space-y-4'>
                <div className='border border-base-300 rounded-lg p-4'>
                  <p className='font-semibold'>Visa ending in 4242</p>
                  <p className='text-sm text-base-content/60'>Expires 12/25</p>
                </div>
                <button className='btn btn-outline btn-sm'>Add Payment Method</button>
              </div>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  ),
};

export const KeepMountedExample: Story = {
  render: () => (
    <div>
      <p className='text-sm text-base-content/70 mb-4'>
        These tab panels stay mounted even when not visible (keepMounted=true).
        Check the console to see that all panels are rendered.
      </p>
      
      <Tabs defaultValue='tab1' variant='bordered'>
        <TabList>
          <Tab value='tab1'>Tab 1</Tab>
          <Tab value='tab2'>Tab 2</Tab>
          <Tab value='tab3'>Tab 3</Tab>
        </TabList>
        <TabPanels>
          <TabPanel value='tab1' keepMounted>
            {console.log('Tab 1 panel rendered')}
            <p>Tab 1 content (always mounted)</p>
          </TabPanel>
          <TabPanel value='tab2' keepMounted>
            {console.log('Tab 2 panel rendered')}
            <p>Tab 2 content (always mounted)</p>
          </TabPanel>
          <TabPanel value='tab3' keepMounted>
            {console.log('Tab 3 panel rendered')}
            <p>Tab 3 content (always mounted)</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  ),
};