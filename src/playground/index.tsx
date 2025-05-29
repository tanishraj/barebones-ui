import { ButtonExample } from './components/ButtonExample';
import { DropdownExample } from './components/DropdownExample';
import { ModalExample } from './components/ModalExample/ModalExample';
import { RichTextEditorExample } from './components/RichEditorExample';
import { SwapExample } from './components/SwapExample';
import { ThemeControllerExample } from './components/ThemeControllerExample';

export const Playground = () => {
  return (
    <div className='flex flex-col space-y-4'>
      <RichTextEditorExample />
      <ButtonExample />
      <DropdownExample />
      <ModalExample />
      <SwapExample />
      <ThemeControllerExample />
    </div>
  );
};
