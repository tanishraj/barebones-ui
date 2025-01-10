import { ModalPosition, ModalSize } from '@/components/Modal/types';

const positionOptions = ['center', 'top', 'bottom'];
const sizeOptions = ['sm', 'md', 'lg', 'full'];

interface PropsOptionsProps {
  setPosition: (position: ModalPosition) => void;
  setSize: (size: ModalSize) => void;
  isResponsive: boolean;
  setIsResponsive: (isResponsive: boolean) => void;
  closeOnBackdropClick: boolean;
  setCloseOnBackdropClick: (closeOnBackdropClick: boolean) => void;
  closeButton: boolean;
  setCloseButton: (closeButton: boolean) => void;
}

const PropsOptions = ({
  setPosition,
  setSize,
  isResponsive,
  setIsResponsive,
  closeOnBackdropClick,
  setCloseOnBackdropClick,
  closeButton,
  setCloseButton,
}: PropsOptionsProps) => {
  return (
    <div className='card card-bordered p-4 shadow-sm'>
      <div className='card-title'>Props:</div>
      <div className='card-body flex flex-row flex-wrap gap-6'>
        <div>
          Position:
          <select
            className='select select-bordered w-full max-w-xs'
            onChange={e => setPosition(e.target.value as ModalPosition)}
          >
            <option>Select Position</option>
            {positionOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          Size:
          <select
            className='select select-bordered w-full max-w-xs'
            onChange={e => setSize(e.target.value as ModalSize)}
          >
            <option>Select Size</option>
            {sizeOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className='flex flex-row flex-wrap gap-2'>
          <label className='flex items-center gap-2'>
            <input
              type='checkbox'
              className='checkbox'
              checked={isResponsive}
              onChange={() => setIsResponsive(!isResponsive)}
            />
            isResponsive
          </label>

          <label className='flex items-center gap-2'>
            <input
              type='checkbox'
              className='checkbox'
              checked={closeOnBackdropClick}
              onChange={() => setCloseOnBackdropClick(!closeOnBackdropClick)}
            />
            closeOnBackdropClick
          </label>

          <label className='flex items-center gap-2'>
            <input
              type='checkbox'
              className='checkbox'
              checked={closeButton}
              onChange={() => setCloseButton(!closeButton)}
            />
            closeButton
          </label>
        </div>
      </div>
    </div>
  );
};

export default PropsOptions;
