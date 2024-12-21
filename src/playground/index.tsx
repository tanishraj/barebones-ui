import { ButtonExample } from './components/ButtonExample';
import { DropdownExample } from './components/DropdownExample';

export const Playground = () => {
  return (
    <div className='flex flex-col space-y-4'>
      <ButtonExample />
      <DropdownExample />
    </div>
  );
};
