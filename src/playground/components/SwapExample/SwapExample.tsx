import { Swap } from '@/components';

export const SwapExample = () => {
  return (
    <div className='card card-bordered p-4 shadow-sm'>
      <div className='card-title'>Modal:</div>
      <div className='card-body flex flex-col flex-wrap gap-2'>
        <div className='card card-bordered p-4 shadow-sm'>
          <div className='card-title'>Basic Swap:</div>
          <div className='card-body flex flex-row flex-wrap gap-2'>
            <Swap>
              <p>First Text</p>
              <p>Second Text</p>
            </Swap>
          </div>
        </div>
      </div>
    </div>
  );
};
