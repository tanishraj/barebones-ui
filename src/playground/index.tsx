import { ButtonExample } from './components/ButtonExample';
import { DropdownExample } from './components/DropdownExample';
import { ModalExample } from './components/ModalExample/ModalExample';
import { SwapExample } from './components/SwapExample';
import { ThemeControllerExample } from './components/ThemeControllerExample';

export const Playground = () => {
  return (
    <div className='flex flex-col space-y-4'>
      <ButtonExample />
      <DropdownExample />
      <ModalExample />
      <SwapExample />
      <ThemeControllerExample />
    </div>
  );
};
