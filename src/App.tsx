import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { GameProvider } from './contexts/GameContext';

function App() {
  return (
    <BrowserRouter>
      <GameProvider>
        <div className="min-h-screen bg-gray-100">
          <p>Start prompting (or editing) to see magic happen :)</p>
        </div>
      </GameProvider>
    </BrowserRouter>
  );
}

export default App;