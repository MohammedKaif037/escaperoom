import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Inventory from '../components/Inventory';
import HintSystem from '../components/HintSystem';
import { useGame } from '../contexts/GameContext';
import { InventoryProvider } from '../contexts/InventoryContext';
import { useHints } from '../hooks/useHints';
import { getRoomById, getPuzzleById } from '../utils/gameData';
import { playSoundEffect } from '../utils/soundEffects';

const Game: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentRoom, setCurrentRoom, isGameActive, endGame } = useGame();
  
  // Get the current room data
  const room = getRoomById(currentRoom);
  
  // Set up hints for the current room
  const roomHints = room?.puzzles.flatMap((puzzle) => puzzle.hints) || [];
  const { unlockHint, getUnlockedHints, hintsUsed, hintsRemaining } = useHints({
    initialHints: roomHints,
    maxHints: 3,
  });
  
  // Handle puzzle solved
  const handlePuzzleSolved = (puzzleId: string) => {
    const puzzle = getPuzzleById(puzzleId);
    if (!puzzle) return;
    
    // Update puzzle state
    puzzle.solved = true;
    
    // Check if all puzzles in the room are solved
    const allSolved = room?.puzzles.every((p) => p.solved);
    
    if (allSolved && room?.nextRoom) {
      // Unlock the next room
      const nextRoom = getRoomById(room.nextRoom);
      if (nextRoom) {
        nextRoom.isLocked = false;
      }
    }
  };
  
  // Handle room completion
  const handleRoomComplete = () => {
    if (!room || !room.nextRoom) return;
    
    setCurrentRoom(room.nextRoom);
    navigate(`/game/room${room.nextRoom}`);
  };
  
  // Handle requesting a hint
  const handleRequestHint = () => {
    const hint = unlockHint();
    if (hint) {
      playSoundEffect('click');
    }
  };
  
  // Redirect to the current room if at /game
  useEffect(() => {
    if (location.pathname === '/game') {
      navigate(`/game/room${currentRoom}`);
    }
  }, [location.pathname, currentRoom, navigate]);
  
  // Check for victory condition
  useEffect(() => {
    if (currentRoom === 5) {
      const finalRoom = getRoomById(5);
      if (finalRoom && finalRoom.puzzles.every((p) => p.solved)) {
        endGame(true);
      }
    }
  }, [currentRoom, endGame]);
  
  if (!room) {
    return <div>Loading...</div>;
  }
  
  return (
    <InventoryProvider>
      <div className="min-h-screen flex flex-col bg-gray-100">
        <Header />
        
        <main className="flex-grow p-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              <div className="lg:col-span-3">
                <Outlet
                  context={{
                    room,
                    onPuzzleSolved: handlePuzzleSolved,
                    onRoomComplete: handleRoomComplete,
                  }}
                />
              </div>
              
              <div className="space-y-4">
                <Inventory />
                
                <HintSystem
                  hints={getUnlockedHints()}
                  hintsUsed={hintsUsed}
                  hintsRemaining={hintsRemaining}
                  onRequestHint={handleRequestHint}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </InventoryProvider>
  );
};

export default Game;