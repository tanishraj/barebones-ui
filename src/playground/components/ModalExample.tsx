import { useState } from 'react';
import { VariantProps } from 'class-variance-authority';

import { Modal } from '@/components';
import { modalStyles } from '@/components/Modal/variants';
import { ModalPosition, ModalSize } from '@/components/Modal/types';

const positionOptions = ['center', 'top', 'bottom'];
const sizeOptions = ['sm', 'md', 'lg', 'full'];

interface PropsOptionsProps {
  setPosition: (position: ModalPosition) => void;
  setSize: (size: ModalSize) => void;
}

const PropsOptions = ({ setPosition, setSize }: PropsOptionsProps) => {
  return (
    <div className='card card-bordered p-4 shadow-sm'>
      <div className='card-title'>Props:</div>
      <div className='card-body flex flex-row flex-wrap gap-2'>
        <select
          className='select select-bordered w-full max-w-xs'
          onChange={e => setPosition(e.target.value as ModalPosition)}
        >
          <option disabled selected>
            Select Position
          </option>
          {positionOptions.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <select
          className='select select-bordered w-full max-w-xs'
          onChange={e => setSize(e.target.value as ModalSize)}
        >
          <option disabled selected>
            Select Size
          </option>
          {sizeOptions.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export const ModalExample = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [position, setPosition] =
    useState<VariantProps<typeof modalStyles>['position']>('center');
  const [size, setSize] =
    useState<VariantProps<typeof modalStyles>['size']>('md');

  return (
    <div className='card card-bordered p-4 shadow-sm'>
      <div className='card-title'>Modal:</div>
      <div className='card-body flex flex-col flex-wrap gap-2'>
        <div className='card card-bordered p-4 shadow-sm'>
          <div className='card-title'>Basic Modal:</div>
          <div className='card-body flex flex-row flex-wrap gap-2'>
            <button
              className='btn btn-primary'
              onClick={() => setIsModalOpen(true)}
            >
              Open Modal
            </button>
            <Modal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              showCloseButton={true}
              closeOnBackdropClick={true}
              footer={
                <>
                  <button
                    className='btn btn-secondary'
                    onClick={() => setIsModalOpen(false)}
                  >
                    Close
                  </button>
                  <button className='btn btn-primary'>Another Action</button>
                </>
              }
            >
              <p>This is the modal content.</p>
            </Modal>
          </div>
          <PropsOptions setPosition={setPosition} setSize={setSize} />
        </div>
      </div>
    </div>
  );
};
