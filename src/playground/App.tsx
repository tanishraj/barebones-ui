import ThemeToggle from './ThemeToggle';

import { Playground } from '@/playground';

export const App = () => {
  return (
    <div className='App flex flex-col gap-5 p-4'>
      <ThemeToggle />
      <Playground />
    </div>
  );
};
