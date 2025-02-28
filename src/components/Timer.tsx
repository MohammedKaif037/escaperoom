import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';
import { useGame } from '../contexts/GameContext';

interface TimerProps {
  className?: string;
}

const Timer: React.FC<TimerProps> = ({ className = '' }) => {
  const { timeRemaining, isGameActive } = useGame();
  const [isLowTime, setIsLowTime] = useState(false);
  
  // Format time as MM:SS
  const formatTime = (): string => {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  // Check if time is running low (less than 5 minutes)
  useEffect(() => {
    setIsLowTime(timeRemaining < 300);
  }, [timeRemaining]);
  
  // Pulse animation for low time
  const timerClasses = `flex items-center gap-2 font-mono text-xl ${
    isLowTime ? 'text-red-600 animate-pulse' : 'text-gray-800'
  } ${className}`;
  
  return (
    <div className={timerClasses}>
      <Clock className={`w-5 h-5 ${isLowTime ? 'text-red-600' : 'text-gray-800'}`} />
      <span className="font-bold">{formatTime()}</span>
    </div>
  );
};

export default Timer;