import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { GameProvider } from './contexts/GameContext';  // Import GameProvider
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GameProvider>  {/* Wrap the entire app */}
      <RouterProvider router={router} />
    </GameProvider>
  </StrictMode>
);
