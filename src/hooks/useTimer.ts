import { useState, useEffect } from 'react';

interface UseTimerProps {
  initialTime: number;
  isActive: boolean;
  onTimeEnd?: () => void;
}

export const useTimer = ({ initialTime, isActive, onTimeEnd }: UseTimerProps) => {
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(isActive);

  useEffect(() => {
    setIsRunning(isActive);
  }, [isActive]);

  useEffect(() => {
    let interval: number | null = null;

    if (isRunning && time > 0) {
      interval = window.setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            if (interval) clearInterval(interval);
            if (onTimeEnd) onTimeEnd();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (!isRunning && interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, time, onTimeEnd]);

  const formatTime = (): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const resetTimer = (newTime?: number) => {
    setTime(newTime !== undefined ? newTime : initialTime);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resumeTimer = () => {
    setIsRunning(true);
  };

  return {
    time,
    isRunning,
    formatTime,
    resetTimer,
    pauseTimer,
    resumeTimer,
  };
};