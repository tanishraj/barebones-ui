import { useState } from 'react';

import Button from '@/components/Button';

interface HelloWorldProps {
  msg: string;
}

export const HelloWorld = ({ msg }: HelloWorldProps) => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>{msg}</h1>

      <div>
        <Button variant='secondary'>Click me</Button>
        <button type='button' onClick={() => setCount(count => count + 1)}>
          count is {count}
        </button>
        <ul>
          <li>
            <span>Home</span>
          </li>
          <li>
            <span>About</span>
          </li>
        </ul>
      </div>
      <p>
        Edit <code>components/HelloWorld.jsx</code> to test HMR (Hot Module
        Replacement)
      </p>

      <p>
        Check out{' '}
        <a href='https://vitejs.dev/guide/' target='_blank' rel='noreferrer'>
          create-react
        </a>
        , the official React + Vite starter
      </p>
      <p>
        Learn more about IDE Support for Vue in the{' '}
        <a href='https://react.dev/learn' target='_blank' rel='noreferrer'>
          React Docs Scaling up Guide
        </a>
        .
      </p>
      <p>Click on the Vite and Vue logos to learn more</p>
    </div>
  );
};
