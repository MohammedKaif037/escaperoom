import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DoorOpen, Clock, Settings, Info } from 'lucide-react';
import Button from '../components/Button';
import Modal from '../components/Modal';
import Footer from '../components/Footer';
import { useGame } from '../contexts/GameContext';
import { playBackgroundMusic, playSoundEffect } from '../utils/soundEffects';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { startGame, setDifficulty, difficulty } = useGame();
  const [showSettings, setShowSettings] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  
  const handleStartGame = () => {
    playSoundEffect('click');
    playBackgroundMusic();
    startGame();
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-2xl overflow-hidden">
          <div
            className="h-48 bg-cover bg-center"
            style={{
              backgroundImage:
                'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?auto=format&fit=crop&q=80&w=1000)',
            }}
          >
            <div className="h-full flex items-center justify-center">
              <h1 className="text-4xl font-bold text-white text-center">
                Escape Room
              </h1>
            </div>
          </div>
          
          <div className="p-6">
            <p className="text-gray-600 mb-6 text-center">
              Can you solve the puzzles and escape before time runs out?
            </p>
            
            <div className="space-y-3">
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={handleStartGame}
                className="flex items-center justify-center gap-2"
              >
                <DoorOpen className="w-5 h-5" />
                Start Game
              </Button>
              
              <Button
                variant="secondary"
                fullWidth
                onClick={() => setShowSettings(true)}
                className="flex items-center justify-center gap-2"
              >
                <Settings className="w-5 h-5" />
                Settings
              </Button>
              
              <Button
                variant="secondary"
                fullWidth
                onClick={() => setShowAbout(true)}
                className="flex items-center justify-center gap-2"
              >
                <Info className="w-5 h-5" />
                How to Play
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      
      {/* Settings Modal */}
      <Modal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        title="Game Settings"
      >
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Difficulty</h3>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="difficulty"
                  value="easy"
                  checked={difficulty === 'easy'}
                  onChange={() => setDifficulty('easy')}
                  className="mr-2"
                />
                <span>Easy (75 minutes)</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="radio"
                  name="difficulty"
                  value="medium"
                  checked={difficulty === 'medium'}
                  onChange={() => setDifficulty('medium')}
                  className="mr-2"
                />
                <span>Medium (60 minutes)</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="radio"
                  name="difficulty"
                  value="hard"
                  checked={difficulty === 'hard'}
                  onChange={() => setDifficulty('hard')}
                  className="mr-2"
                />
                <span>Hard (45 minutes)</span>
              </label>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <Button
            variant="primary"
            fullWidth
            onClick={() => setShowSettings(false)}
          >
            Save Settings
          </Button>
        </div>
      </Modal>
      
      {/* About Modal */}
      <Modal
        isOpen={showAbout}
        onClose={() => setShowAbout(false)}
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
            onClick={() => setShowAbout(false)}
          >
            Got it!
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Home;