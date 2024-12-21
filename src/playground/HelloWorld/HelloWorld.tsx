import { Dropdown, Button } from '@/components';

const MOCK_DROPDOWN_ITEMS = [
  { label: 'Item 1', onClick: () => alert('Clicked Item 1') },
  { label: 'Item 2', onClick: () => alert('Clicked Item 2') },
];

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
          <Dropdown buttonLabel='Toggle Dropdown' items={MOCK_DROPDOWN_ITEMS} />
          <Dropdown
            buttonLabel='Toggle Dropdown'
            items={MOCK_DROPDOWN_ITEMS}
            position='top'
          />
          <Dropdown
            buttonLabel='Toggle Dropdown'
            items={MOCK_DROPDOWN_ITEMS}
            position='left'
          />
          <Dropdown
            buttonLabel='Toggle Dropdown'
            items={MOCK_DROPDOWN_ITEMS}
            position='right'
          />
          <Dropdown
            buttonLabel='Toggle Dropdown'
            items={MOCK_DROPDOWN_ITEMS}
            alignment='start'
          />
          <Dropdown
            buttonLabel='Toggle Dropdown'
            items={MOCK_DROPDOWN_ITEMS}
            alignment='end'
          />

          <Dropdown
            buttonLabel='Hover Dropdown'
            behavior='hover'
            items={MOCK_DROPDOWN_ITEMS}
          />

          <Dropdown
            buttonLabel='Force Open Dropdown'
            behavior='forceOpen'
            items={MOCK_DROPDOWN_ITEMS}
          />

          <Dropdown
            buttonLabel='Click Outside Dropdown'
            behavior='clickOutsideClose'
            items={MOCK_DROPDOWN_ITEMS}
          />
        </div>
      </div>
    </div>
  );
};
