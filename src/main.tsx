import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { GamificationProvider } from './providers';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <GamificationProvider>
        <App />
      </GamificationProvider>
    </BrowserRouter>
  </React.StrictMode>
);