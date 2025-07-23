import { LexicalEditor } from '@/components';

export const LexicalFocusedExample = () => {
  return (
    <div className='card-bordered p-4 shadow-xs'>
      <div className='card-title'>LexicalFocusedExample</div>
      <div className='card-body flex flex-col flex-wrap gap-2'>
        <LexicalEditor />
      </div>
    </div>
  );
};
