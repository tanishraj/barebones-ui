import { Swap } from '@/components';
import { useTheme } from '@/hooks/useTheme';

export const ThemeControllerExample = () => {
  const { currentTheme, toggleTheme } = useTheme({
    themes: ['light', 'dark'],
    defaultTheme: 'light',
  });

  return (
    <div className='card card-bordered p-4 shadow-sm'>
      <div className='card-body flex gap-2'>
        <h1 className='mb-6 text-3xl font-bold'>useTheme Hook</h1>
        <div className='card card-bordered p-4 shadow-sm'>
          <div className='card-body flex gap-2'>
            <p className='mb-4'>Current Theme: {currentTheme}</p>
            <Swap isActive={currentTheme === 'dark'} onClick={toggleTheme}>
              <div>switch to LIGHT mode</div>
              <div>switch to DARK mode</div>
            </Swap>
          </div>
        </div>
      </div>
    </div>
  );
};
