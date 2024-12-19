import ThemeToggle from './ThemeToggle';

import { HelloWorld } from '@/playground/HelloWorld/HelloWorld';

export const App = () => {
  return (
    <div className='App flex flex-col gap-5 p-4'>
      <ThemeToggle />
      <HelloWorld />
    </div>
  );
};
