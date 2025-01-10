import { useState } from 'react';
import { VariantProps } from 'class-variance-authority';

import PropsOptions from './PropOptions';

import { Modal } from '@/components';
import { modalStyles } from '@/components/Modal/variants';

export const ModalExample = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [position, setPosition] =
    useState<VariantProps<typeof modalStyles>['position']>('center');
  const [size, setSize] = useState<VariantProps<typeof modalStyles>['size']>();
  const [isResponsive, setIsResponsive] = useState(false);
  const [closeOnBackdropClick, setCloseOnBackdropClick] = useState(false);
  const [closeButton, setCloseButton] = useState(false);

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
              size={size}
              position={position}
              isResponsive={isResponsive}
              closeButton={closeButton}
              footer={true}
              closeOnBackdropClick={closeOnBackdropClick}
              onClose={() => setIsModalOpen(false)}
            >
              <h3 className='text-lg font-bold'>Hello!</h3>
              <p className='py-4'>This modal works with a hidden checkbox!</p>
            </Modal>
          </div>
          <PropsOptions
            setPosition={setPosition}
            setSize={setSize}
            isResponsive={isResponsive}
            setIsResponsive={setIsResponsive}
            closeOnBackdropClick={closeOnBackdropClick}
            setCloseOnBackdropClick={setCloseOnBackdropClick}
            closeButton={closeButton}
            setCloseButton={setCloseButton}
          />
        </div>
      </div>
    </div>
  );
};
