import React, { useState } from 'react';
import { Menu, Volume2, VolumeX, HelpCircle, Pause, Play } from 'lucide-react';
import Timer from './Timer';
import Modal from './Modal';
import Button from './Button';
import { useGame } from '../contexts/GameContext';
import { toggleMute, isMuted, playSoundEffect } from '../utils/soundEffects';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  const { pauseGame, resumeGame, isGameActive } = useGame();
  const [showMenu, setShowMenu] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [muted, setMuted] = useState(isMuted());
  
  const handleToggleMute = () => {
    const newMutedState = toggleMute();
    setMuted(newMutedState);
    playSoundEffect('click');
  };
  
  const handlePauseResume = () => {
    if (isGameActive) {
      pauseGame();
    } else {
      resumeGame();
    }
    playSoundEffect('click');
  };
  
  return (
    <header className={`bg-white shadow-md p-4 ${className}`}>
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-gray-800">Escape Room</h1>
        </div>
        
        <Timer />
        
        <div className="flex items-center gap-3">
          <button
            onClick={handleToggleMute}
            className="p-2 rounded-full hover:bg-gray-100"
            aria-label={muted ? 'Unmute' : 'Mute'}
          >
            {muted ? (
              <VolumeX className="w-5 h-5 text-gray-600" />
            ) : (
              <Volume2 className="w-5 h-5 text-gray-600" />
            )}
          </button>
          
          <button
            onClick={handlePauseResume}
            className="p-2 rounded-full hover:bg-gray-100"
            aria-label={isGameActive ? 'Pause' : 'Resume'}
          >
            {isGameActive ? (
              <Pause className="w-5 h-5 text-gray-600" />
            ) : (
              <Play className="w-5 h-5 text-gray-600" />
            )}
          </button>
          
          <button
            onClick={() => setShowHelp(true)}
            className="p-2 rounded-full hover:bg-gray-100"
            aria-label="Help"
          >
            <HelpCircle className="w-5 h-5 text-gray-600" />
          </button>
          
          <button
            onClick={() => setShowMenu(true)}
            className="p-2 rounded-full hover:bg-gray-100"
            aria-label="Menu"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
      
      {/* Menu Modal */}
      <Modal
        isOpen={showMenu}
        onClose={() => setShowMenu(false)}
        title="Game Menu"
      >
        <div className="space-y-3">
          <Button
            variant="primary"
            fullWidth
            onClick={() => {
              setShowMenu(false);
              resumeGame();
            }}
          >
            Resume Game
          </Button>
          
          <Button
            variant="secondary"
            fullWidth
            onClick={() => {
              setShowMenu(false);
              setShowHelp(true);
            }}
          >
            How to Play
          </Button>
          
          <Button
            variant="danger"
            fullWidth
            onClick={() => {
              if (confirm('Are you sure you want to quit? Your progress will be lost.')) {
                window.location.href = '/';
              }
            }}
          >
            Quit Game
          </Button>
        </div>
      </Modal>
      
      {/* Help Modal */}
      <Modal
        isOpen={showHelp}
        onClose={() => setShowHelp(false)}
        title="How to Play"
      >
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-800 mb-1">Goal</h3>
            <p className="text-gray-600">
              Escape from all rooms by solving puzzles before the time runs out.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800 mb-1">Controls</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Click on areas to inspect them</li>
              <li>Collect items by exploring the room</li>
              <li>Use items from your inventory to solve puzzles</li>
              <li>Submit answers to puzzles to progress</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800 mb-1">Hints</h3>
            <p className="text-gray-600">
              If you're stuck, you can use hints to help you solve puzzles. You have a limited number of hints available.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800 mb-1">Time</h3>
            <p className="text-gray-600">
              Keep an eye on the timer! You need to escape all rooms before time runs out.
            </p>
          </div>
        </div>
        
        <div className="mt-4">
          <Button
            variant="primary"
            fullWidth
            onClick={() => setShowHelp(false)}
          >
            Got it!
          </Button>
        </div>
      </Modal>
    </header>
  );
};

export default Header;