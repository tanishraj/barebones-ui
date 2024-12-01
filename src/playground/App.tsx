import ThemeToggle from './ThemeToggle';

import { HelloWorld } from '@/playground/HelloWorld/HelloWorld';
import ViteLogo from '@/assets/vite.svg';
import ReactLogo from '@/assets/react.svg';

export const App = () => {
  return (
    <div className='App'>
      <ThemeToggle />
      <div className='flex-center'>
        <a href='https://vitejs.dev' target='_blank' rel='noreferrer'>
          <img src={ViteLogo} className='logo' alt='Vite logo' />
        </a>
        <a href='https://vuejs.org/' target='_blank' rel='noreferrer'>
          <img src={ReactLogo} className='logo' alt='React logo' />
        </a>
      </div>
      <HelloWorld msg={'Vite + React'} />
    </div>
  );
};
