import { Button } from '@/components';

export const ButtonExample = () => {
  return (
    <div className='card card-bordered p-4 shadow-sm'>
      <div className='card-title'>Button:</div>

      <div className='card-body flex flex-col flex-wrap gap-2'>
        <div className='card card-bordered p-4 shadow-sm'>
          <div className='card-title'>Deafult:</div>
          <div className='card-body flex flex-row flex-wrap gap-2'>
            <Button>Default</Button>
          </div>
        </div>

        <div className='card card-bordered p-4 shadow-sm'>
          <div className='card-title'>Disabled:</div>
          <div className='card-body flex flex-row flex-wrap gap-2'>
            <Button disabled>Disabled</Button>
          </div>
        </div>

        <div className='card card-bordered p-4 shadow-sm'>
          <div className='card-title'>Variant:</div>
          <div className='card-body flex flex-row flex-wrap gap-2'>
            <Button variant='primary'>Primary</Button>
            <Button variant='secondary'>Secondary</Button>
            <Button variant='accent'>Accent</Button>
            <Button variant='neutral'>Neutral</Button>
            <Button variant='ghost'>Ghost</Button>
            <Button variant='link'>Link</Button>
            <Button variant='success'>Success</Button>
            <Button variant='warning'>Warning</Button>
            <Button variant='error'>Error</Button>
            <Button variant='info'>Info</Button>
          </div>
        </div>

        <div className='card card-bordered p-4 shadow-sm'>
          <div className='card-title'>Outline:</div>
          <div className='card-body flex flex-row flex-wrap gap-2'>
            <Button variant='primary' outline='solid'>
              Solid Primary
            </Button>
            <Button variant='secondary' outline='dotted'>
              Dotted Secondary
            </Button>
            <Button variant='accent' outline='dashed'>
              Dashed Accent
            </Button>
          </div>
        </div>

        <div className='card card-bordered p-4 shadow-sm'>
          <div className='card-title'>Size:</div>
          <div className='card-body flex flex-row flex-wrap gap-2'>
            <Button size='xs'>xs Button</Button>
            <Button size='sm'>sm Button</Button>
            <Button size='md'>md Button</Button>
            <Button size='lg'>lg Button</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
