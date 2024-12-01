import React from 'react';
import ReactDOM from 'react-dom/client';

import '../tailwind.css';
import { App } from './App';
import { ThemeProvider } from './ThemeProvider';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
