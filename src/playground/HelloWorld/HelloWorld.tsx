import { Dropdown, Button } from '@/components';

export const HelloWorld = () => {
  return (
    <div className='flex flex-col space-y-4'>
      <div className='card card-bordered p-4 shadow-sm'>
        <div className='card-title'>Buttons:</div>
        <div className='card-body flex flex-row flex-wrap gap-2'>
          <Button>Default</Button>
          <Button variant='primary'>Primary</Button>
          <Button variant='secondary'>Secondary</Button>
          <Button variant='accent'>Accent</Button>
          <Button variant='neutral'>Neutral</Button>

          <Button size='xs' variant='primary'>
            Extra Small
          </Button>
          <Button size='sm' variant='primary'>
            Small
          </Button>
          <Button size='md' variant='primary'>
            Medium
          </Button>
          <Button size='lg' variant='primary'>
            Large
          </Button>

          <Button variant='primary' icon={'🌼'} iconPosition='left'>
            Icon Left
          </Button>
          <Button variant='primary' icon={'🌼'} iconPosition='right'>
            Icon Right
          </Button>

          <Button variant='secondary' disabled>
            Disabled
          </Button>

          <Button variant='ghost'>Ghost</Button>
          <Button variant='link'>Link</Button>
        </div>
      </div>

      <div className='card card-bordered p-4 shadow-sm'>
        <div className='card-title'>Dropdown:</div>
        <div className='card-body flex flex-row flex-wrap gap-2'>
          <Dropdown
            items={[
              { label: 'Item 1', onClick: () => alert('Clicked Item 1') },
              { label: 'Item 2', onClick: () => alert('Clicked Item 2') },
            ]}
            position='bottom'
            alignment='start'
            behavior='toggle'
          />

          <Dropdown position='top' alignment='end' behavior='hover'>
            <div className='flex flex-col p-2'>
              <p className='mb-2'>Custom Content</p>
              <button className='btn btn-primary'>Custom Button</button>
            </div>
          </Dropdown>

          <Dropdown
            items={[
              { label: 'Always Open Item 1' },
              { label: 'Always Open Item 2' },
            ]}
            behavior='forceOpen'
          />

          <Dropdown
            items={[
              { label: 'Close on Outside Click 1' },
              { label: 'Close on Outside Click 2' },
            ]}
            behavior='clickOutsideClose'
          />
        </div>
      </div>
    </div>
  );
};
