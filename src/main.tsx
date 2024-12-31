import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, RouterProvider } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

// Configure future flags
const router = createBrowserRouter([
  {
    path: '/*',
    element: <App />
  }
], {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);