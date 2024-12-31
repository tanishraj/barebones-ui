import { Modal } from '@/components';

export const ModalExample = () => {
  return (
    <div className='card card-bordered p-4 shadow-sm'>
      <div className='card-title'>Modal:</div>

      <div className='card-body flex flex-col flex-wrap gap-2'>
        <div className='card card-bordered p-4 shadow-sm'>
          <div className='card-title'>Basic Modal:</div>
          <div className='card-body flex flex-row flex-wrap gap-2'>
            <Modal
              closeOnBackdropClick
              footerContent={<button className='btn'>Close</button>}
            >
              <h3 className='text-lg font-bold'>Hello!</h3>
              <p className='py-4'>
                Press ESC key or click the button below to close
              </p>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};
