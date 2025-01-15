import { ThemeController } from '@/components';

export const ThemeControllerExample = () => {
  return (
    <div className='min-h-screen bg-base-100 text-base-content'>
      <header className='navbar bg-base-200'>
        <div className='flex-1'>
          <a className='btn btn-ghost text-xl'>My App</a>
        </div>
        <div className='flex-none'>
          <ThemeController />
        </div>
      </header>
      <main className='p-8'>
        <h1 className='text-3xl font-bold'>Welcome to My App</h1>
        <p className='mt-4'>
          Switch themes using the theme controller in the top-right corner.
        </p>
      </main>
    </div>
  );
};
