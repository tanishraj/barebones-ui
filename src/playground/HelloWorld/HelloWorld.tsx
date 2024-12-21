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

        <div className='card-body flex flex-col flex-wrap gap-2'>
          <div className='card card-bordered p-4 shadow-sm'>
            <div className='card-title'>Deafult:</div>
            <div className='card-body flex flex-row flex-wrap gap-2'>
              <Dropdown label='Toggle Dropdown' items={MOCK_DROPDOWN_ITEMS} />
            </div>
          </div>

          <div className='card card-bordered p-4 shadow-sm'>
            <div className='card-title'>Variants:</div>
            <div className='card-body flex flex-row flex-wrap gap-2'>
              <Dropdown
                label='Primary Dropdown'
                variant='primary'
                items={MOCK_DROPDOWN_ITEMS}
              />
              <Dropdown
                label='Secondary Dropdown'
                variant='secondary'
                items={MOCK_DROPDOWN_ITEMS}
              />
              <Dropdown
                label='Accent Dropdown'
                variant='accent'
                items={MOCK_DROPDOWN_ITEMS}
              />
              <Dropdown
                label='Neutral Dropdown'
                variant='neutral'
                items={MOCK_DROPDOWN_ITEMS}
              />
              <Dropdown
                label='Info Dropdown'
                variant='info'
                items={MOCK_DROPDOWN_ITEMS}
              />
              <Dropdown
                label='Success Dropdown'
                variant='success'
                items={MOCK_DROPDOWN_ITEMS}
              />
              <Dropdown
                label='Warning Dropdown'
                variant='warning'
                items={MOCK_DROPDOWN_ITEMS}
              />
              <Dropdown
                label='Error Dropdown'
                variant='error'
                items={MOCK_DROPDOWN_ITEMS}
              />
              <Dropdown
                label='Ghost Dropdown'
                variant='ghost'
                items={MOCK_DROPDOWN_ITEMS}
              />
              <Dropdown
                label='Link Dropdown'
                variant='link'
                items={MOCK_DROPDOWN_ITEMS}
              />
              <Dropdown
                label='Outline Dropdown'
                variant='outline'
                items={MOCK_DROPDOWN_ITEMS}
              />
            </div>
          </div>

          <div className='card card-bordered p-4 shadow-sm'>
            <div className='card-title'>Sizes:</div>
            <div className='card-body flex flex-row flex-wrap gap-2'>
              <Dropdown
                label='xs Dropdown'
                size={'xs'}
                items={MOCK_DROPDOWN_ITEMS}
              />
              <Dropdown
                label='sm Dropdown'
                size={'sm'}
                items={MOCK_DROPDOWN_ITEMS}
              />
              <Dropdown
                label='md Dropdown'
                size={'md'}
                items={MOCK_DROPDOWN_ITEMS}
              />
              <Dropdown
                label='lg Dropdown'
                size={'lg'}
                items={MOCK_DROPDOWN_ITEMS}
              />
            </div>
          </div>

          <div className='card card-bordered p-4 shadow-sm'>
            <div className='card-title'>Menu Alignment:</div>
            <div className='card-body flex flex-row flex-wrap gap-2'>
              <Dropdown
                label='Start Menu'
                alignment='start'
                items={MOCK_DROPDOWN_ITEMS}
              />
              <Dropdown
                label='End Menu'
                alignment='end'
                items={MOCK_DROPDOWN_ITEMS}
              />
            </div>
          </div>

          <div className='card card-bordered p-4 shadow-sm'>
            <div className='card-title'>Menu Position:</div>
            <div className='card-body flex flex-row flex-wrap gap-2'>
              <Dropdown
                label='Top Menu'
                position='top'
                items={MOCK_DROPDOWN_ITEMS}
              />
              <Dropdown
                label='Bottom Menu'
                position='bottom'
                items={MOCK_DROPDOWN_ITEMS}
              />
              <Dropdown
                label='Left Menu'
                position='left'
                items={MOCK_DROPDOWN_ITEMS}
              />
              <Dropdown
                label='Right Menu'
                position='right'
                items={MOCK_DROPDOWN_ITEMS}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
