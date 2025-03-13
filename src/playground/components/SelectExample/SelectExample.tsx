import { useState } from 'react';

import { Select } from '@/components';

const SELECT_OPTIONS = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
];

export function SelectExample() {
  const [value, setValue] = useState('');

  return (
    <div className='p-4'>
      <Select
        name='test'
        options={SELECT_OPTIONS}
        value={value}
        onChange={e => setValue(e.target.value)}
        label='Choose an option'
        variant='primary'
        size='md'
        helperText='This is a helper text'
      />
    </div>
  );
}
