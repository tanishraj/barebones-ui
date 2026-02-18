import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import {
  Mail,
  Lock,
  Search,
  User,
  Eye,
  Calendar,
  Phone,
  Globe,
} from 'lucide-react';

import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Input component based on DaisyUI with various sizes, colors, and states.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size of the input',
    },
    variant: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'accent',
        'neutral',
        'info',
        'success',
        'warning',
        'error',
        'ghost',
      ],
      description: 'Color variant of the input',
    },
    bordered: {
      control: 'boolean',
      description: 'Show border on input',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the input',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    label: {
      control: 'text',
      description: 'Label for the input',
    },
    labelPosition: {
      control: 'select',
      options: ['top', 'left'],
      description: 'Position of the label',
    },
    helper: {
      control: 'text',
      description: 'Helper text below input',
    },
    error: {
      control: 'text',
      description: 'Error message',
    },
    success: {
      control: 'text',
      description: 'Success message',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Type something...',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email',
    type: 'email',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className='flex flex-col gap-4 w-64'>
      <Input size='xs' placeholder='Extra small input' />
      <Input size='sm' placeholder='Small input' />
      <Input size='md' placeholder='Medium input (default)' />
      <Input size='lg' placeholder='Large input' />
      <Input size='xl' placeholder='Extra large input' />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className='flex flex-col gap-4 w-64'>
      <Input variant='primary' placeholder='Primary' />
      <Input variant='secondary' placeholder='Secondary' />
      <Input variant='accent' placeholder='Accent' />
      <Input variant='neutral' placeholder='Neutral' />
      <Input variant='info' placeholder='Info' />
      <Input variant='success' placeholder='Success' />
      <Input variant='warning' placeholder='Warning' />
      <Input variant='error' placeholder='Error' />
      <Input variant='ghost' placeholder='Ghost (no background)' />
    </div>
  ),
};

export const WithHelperText: Story = {
  render: () => (
    <div className='flex flex-col gap-4 w-64'>
      <Input
        label='Username'
        placeholder='Enter username'
        helper='Choose a unique username'
      />
      <Input
        label='Password'
        type='password'
        placeholder='Enter password'
        helper='Must be at least 8 characters'
      />
    </div>
  ),
};

export const ValidationStates: Story = {
  render: () => (
    <div className='flex flex-col gap-4 w-64'>
      <Input
        label='Email'
        placeholder='Enter email'
        value='user@example.com'
        success='Email is valid!'
      />
      <Input
        label='Username'
        placeholder='Enter username'
        value='admin'
        error='Username already taken'
      />
      <Input
        label='Phone'
        placeholder='Enter phone number'
        helper='Include country code'
      />
    </div>
  ),
};

export const WithAdornments: Story = {
  render: () => (
    <div className='flex flex-col gap-4 w-64'>
      <Input
        placeholder='Search...'
        startAdornment={<Search className='h-4 w-4' />}
      />
      <Input
        placeholder='Email'
        type='email'
        startAdornment={<Mail className='h-4 w-4' />}
      />
      <Input
        placeholder='Password'
        type='password'
        startAdornment={<Lock className='h-4 w-4' />}
        endAdornment={<Eye className='h-4 w-4 cursor-pointer' />}
      />
      <Input
        placeholder='Username'
        startAdornment={<User className='h-4 w-4' />}
      />
      <Input
        placeholder='Price'
        startAdornment='$'
        endAdornment='.00'
        type='number'
      />
      <Input placeholder='Website' startAdornment='https://' />
    </div>
  ),
};

export const LabelPositions: Story = {
  render: () => (
    <div className='flex flex-col gap-6 w-96'>
      <Input
        label='Top Label (Default)'
        labelPosition='top'
        placeholder='Enter value'
      />
      <Input
        label='Left Label'
        labelPosition='left'
        placeholder='Enter value'
      />
    </div>
  ),
};

export const InputTypes: Story = {
  render: () => (
    <div className='flex flex-col gap-4 w-64'>
      <Input type='text' placeholder='Text input' label='Text' />
      <Input type='email' placeholder='email@example.com' label='Email' />
      <Input type='password' placeholder='Password' label='Password' />
      <Input type='number' placeholder='123' label='Number' />
      <Input type='tel' placeholder='+1234567890' label='Phone' />
      <Input type='url' placeholder='https://example.com' label='URL' />
      <Input type='date' label='Date' />
      <Input type='time' label='Time' />
      <Input type='datetime-local' label='Date & Time' />
      <Input type='month' label='Month' />
      <Input type='week' label='Week' />
      <Input type='search' placeholder='Search...' label='Search' />
    </div>
  ),
};

export const DisabledState: Story = {
  render: () => (
    <div className='flex flex-col gap-4 w-64'>
      <Input placeholder='Disabled input' disabled value='Cannot edit this' />
      <Input label='Disabled with label' placeholder='Disabled' disabled />
      <Input
        placeholder='Disabled with icon'
        startAdornment={<Mail className='h-4 w-4' />}
        disabled
      />
    </div>
  ),
};

export const ControlledInput: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const [email, setEmail] = useState('');

    return (
      <div className='flex flex-col gap-4 w-64'>
        <div>
          <Input
            label='Controlled Input'
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder='Type something...'
            helper={`Character count: ${value.length}`}
          />
          <button className='btn btn-sm mt-2' onClick={() => setValue('')}>
            Clear
          </button>
        </div>

        <Input
          label='Email Validation'
          type='email'
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder='Enter email'
          error={
            email && !email.includes('@') ? 'Invalid email format' : undefined
          }
          success={email && email.includes('@') ? 'Valid email!' : undefined}
        />
      </div>
    );
  },
};

export const FormExample: Story = {
  render: () => (
    <form className='card w-96 bg-base-100 shadow-xl'>
      <div className='card-body'>
        <h2 className='card-title'>Sign Up Form</h2>

        <Input
          label='Full Name'
          placeholder='John Doe'
          startAdornment={<User className='h-4 w-4' />}
          required
        />

        <Input
          label='Email'
          type='email'
          placeholder='john@example.com'
          startAdornment={<Mail className='h-4 w-4' />}
          required
        />

        <Input
          label='Password'
          type='password'
          placeholder='Enter password'
          startAdornment={<Lock className='h-4 w-4' />}
          helper='Minimum 8 characters'
          required
        />

        <Input
          label='Phone Number'
          type='tel'
          placeholder='+1 (555) 000-0000'
          startAdornment={<Phone className='h-4 w-4' />}
        />

        <Input
          label='Birth Date'
          type='date'
          startAdornment={<Calendar className='h-4 w-4' />}
        />

        <Input
          label='Website'
          type='url'
          placeholder='https://yoursite.com'
          startAdornment={<Globe className='h-4 w-4' />}
        />

        <div className='card-actions justify-end mt-4'>
          <button type='button' className='btn btn-ghost'>
            Cancel
          </button>
          <button type='submit' className='btn btn-primary'>
            Sign Up
          </button>
        </div>
      </div>
    </form>
  ),
};

export const ComplexValidation: Story = {
  render: () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const passwordValidation = () => {
      if (!password) return {};
      if (password.length < 8) return { error: 'Password too short' };
      if (!/[A-Z]/.test(password)) return { error: 'Need uppercase letter' };
      if (!/[0-9]/.test(password)) return { error: 'Need a number' };
      return { success: 'Strong password!' };
    };

    const confirmValidation = () => {
      if (!confirmPassword) return {};
      if (confirmPassword !== password)
        return { error: 'Passwords do not match' };
      return { success: 'Passwords match!' };
    };

    return (
      <div className='flex flex-col gap-4 w-80'>
        <Input
          label='New Password'
          type='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder='Enter password'
          startAdornment={<Lock className='h-4 w-4' />}
          {...passwordValidation()}
        />

        <Input
          label='Confirm Password'
          type='password'
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          placeholder='Confirm password'
          startAdornment={<Lock className='h-4 w-4' />}
          {...confirmValidation()}
        />

        <div className='text-xs space-y-1 mt-2'>
          <div
            className={
              password.length >= 8 ? 'text-success' : 'text-base-content/50'
            }
          >
            ✓ At least 8 characters
          </div>
          <div
            className={
              /[A-Z]/.test(password) ? 'text-success' : 'text-base-content/50'
            }
          >
            ✓ One uppercase letter
          </div>
          <div
            className={
              /[0-9]/.test(password) ? 'text-success' : 'text-base-content/50'
            }
          >
            ✓ One number
          </div>
        </div>
      </div>
    );
  },
};

export const CustomStyling: Story = {
  render: () => (
    <div className='flex flex-col gap-4 w-64'>
      <Input placeholder='Custom class' className='!rounded-full' />
      <Input
        placeholder='With custom border'
        className='!border-2 !border-dashed !border-primary'
      />
      <Input placeholder='With shadow' className='shadow-lg' />
      <Input
        placeholder='Gradient border'
        bordered={false}
        className='!bg-gradient-to-r !from-primary !to-secondary !p-[2px]'
      />
    </div>
  ),
};
