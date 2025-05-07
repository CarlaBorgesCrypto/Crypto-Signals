import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { AuthProvider } from './contexts/AuthContext';
import { SignalsProvider } from './contexts/SignalsContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <SignalsProvider>
          <App />
        </SignalsProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
