import { RichEditor } from '@/components';

export const RichTextEditorExample = () => {
  return (
    <div className='card-bordered card p-4 shadow-xs'>
      <div className='card-title'>Rich Editor:</div>

      <div className='card-body flex flex-col flex-wrap gap-2'>
        <div className='card-bordered card p-4 shadow-xs'>
          <div className='card-title'>Deafult:</div>
          <div className='card-body flex flex-row flex-wrap gap-2'>
            <RichEditor />
          </div>
        </div>
      </div>
    </div>
  );
};
