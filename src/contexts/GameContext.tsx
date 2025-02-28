import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface GameContextType {
  timeRemaining: number;
  startGame: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  endGame: (victory: boolean) => void;
  isGameActive: boolean;
  currentRoom: number;
  setCurrentRoom: (room: number) => void;
  difficulty: 'easy' | 'medium' | 'hard';
  setDifficulty: (difficulty: 'easy' | 'medium' | 'hard') => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const navigate = useNavigate();
  const [timeRemaining, setTimeRemaining] = useState(3600); // 60 minutes in seconds
  const [isGameActive, setIsGameActive] = useState(false);
  const [currentRoom, setCurrentRoom] = useState(1);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [timerId, setTimerId] = useState<number | null>(null);

  // Set time based on difficulty
  useEffect(() => {
    if (difficulty === 'easy') {
      setTimeRemaining(4500); // 75 minutes
    } else if (difficulty === 'medium') {
      setTimeRemaining(3600); // 60 minutes
    } else {
      setTimeRemaining(2700); // 45 minutes
    }
  }, [difficulty]);

  // Timer logic
  useEffect(() => {
    if (isGameActive && timeRemaining > 0) {
      const id = window.setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(id);
            endGame(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      setTimerId(id);
      
      return () => {
        if (id) clearInterval(id);
      };
    }
  }, [isGameActive]);

  const startGame = () => {
    setIsGameActive(true);
    setCurrentRoom(1);
    navigate('/game/room1');
  };

  const pauseGame = () => {
    setIsGameActive(false);
    if (timerId) clearInterval(timerId);
  };

  const resumeGame = () => {
    setIsGameActive(true);
  };

  const endGame = (victory: boolean) => {
    setIsGameActive(false);
    if (timerId) clearInterval(timerId);
    
    if (victory) {
      navigate('/victory');
    } else {
      navigate('/game-over');
    }
  };

  return (
    <GameContext.Provider
      value={{
        timeRemaining,
        startGame,
        pauseGame,
        resumeGame,
        endGame,
        isGameActive,
        currentRoom,
        setCurrentRoom,
        difficulty,
        setDifficulty,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = (): GameContextType => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};