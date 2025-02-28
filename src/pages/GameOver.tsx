import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, RotateCcw, Home } from 'lucide-react';
import Button from '../components/Button';
import Footer from '../components/Footer';
import { stopBackgroundMusic, playSoundEffect } from '../utils/soundEffects';

const GameOver: React.FC = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    stopBackgroundMusic();
    playSoundEffect('game_over');
  }, []);
  
  const handlePlayAgain = () => {
    playSoundEffect('click');
    navigate('/');
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-2xl overflow-hidden">
          <div
            className="h-48 bg-cover bg-center"
            style={{
              backgroundImage:
                'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)), url(https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?auto=format&fit=crop&q=80&w=1000)',
            }}
          >
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-red-500 mb-2">Game Over</h1>
                <div className="flex items-center justify-center text-white">
                  <Clock className="w-5 h-5 mr-2" />
                  <p>Time's up!</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <p className="text-gray-600 mb-6 text-center">
              You couldn't escape in time. The doors are now permanently locked.
            </p>
            
            <div className="space-y-3">
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={handlePlayAgain}
                className="flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-5 h-5" />
                Play Again
              </Button>
              
              <Button
                variant="secondary"
                fullWidth
                onClick={() => navigate('/')}
                className="flex items-center justify-center gap-2"
              >
                <Home className="w-5 h-5" />
                Return to Home
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default GameOver;