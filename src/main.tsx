import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App.tsx';

import '@fontsource/bungee-shade';
import '@fontsource/poppins';

import 'reset-css';
import './styles/global.css';

// import { IconName } from 'react-icons/ai';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
