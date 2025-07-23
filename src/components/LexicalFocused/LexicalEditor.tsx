import { Button } from '../Button';
import { Editor } from './Editor';

export const LexicalEditor = () => {
  return (
    <div>
      <Editor />
      <div className='flex justify-end items-center gap-2 mt-4'>
        <Button variant='primary'>Save</Button>
        <Button variant='secondary'>Cancel</Button>
      </div>
    </div>
  );
};
