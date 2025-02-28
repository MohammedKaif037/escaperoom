import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, Clock, RotateCcw, Home, Share2 } from 'lucide-react';
import Button from '../components/Button';
import Footer from '../components/Footer';
import { useGame } from '../contexts/GameContext';
import { stopBackgroundMusic, playSoundEffect } from '../utils/soundEffects';

const Victory: React.FC = () => {
  const navigate = useNavigate();
  const { timeRemaining, difficulty } = useGame();
  const [showShareMessage, setShowShareMessage] = useState(false);
  
  // Calculate time taken
  const totalTime = difficulty === 'easy' ? 4500 : difficulty === 'medium' ? 3600 : 2700;
  const timeTaken = totalTime - timeRemaining;
  const minutes = Math.floor(timeTaken / 60);
  const seconds = timeTaken % 60;
  
  useEffect(() => {
    stopBackgroundMusic();
    playSoundEffect('victory');
  }, []);
  
  const handlePlayAgain = () => {
    playSoundEffect('click');
    navigate('/');
  };
  
  const handleShare = () => {
    const text = `I escaped the Escape Room Game in ${minutes}:${seconds.toString().padStart(2, '0')} on ${difficulty} difficulty!`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Escape Room Game',
        text: text,
      }).catch((error) => console.log('Error sharing', error));
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(text).then(() => {
        setShowShareMessage(true);
        setTimeout(() => setShowShareMessage(false), 3000);
      });
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-2xl overflow-hidden">
          <div
            className="h-48 bg-cover bg-center"
            style={{
              backgroundImage:
                'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(https://images.unsplash.com/photo-1579208570378-8c970854bc23?auto=format&fit=crop&q=80&w=1000)',
            }}
          >
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-yellow-400 mb-2">Victory!</h1>
                <div className="flex items-center justify-center text-white">
                  <Trophy className="w-5 h-5 mr-2 text-yellow-400" />
                  <p>You escaped!</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="mb-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-blue-600" />
                <p className="text-gray-800 font-medium">
                  Time taken: {minutes}:{seconds.toString().padStart(2, '0')}
                </p>
              </div>
              <p className="text-gray-600 text-center">
                Congratulations! You successfully solved all the puzzles and escaped the rooms.
              </p>
            </div>
            
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
                variant="success"
                fullWidth
                onClick={handleShare}
                className="flex items-center justify-center gap-2"
              >
                <Share2 className="w-5 h-5" />
                Share Result
              </Button>
              
              {showShareMessage && (
                <p className="text-green-600 text-sm text-center">
                  Result copied to clipboard!
                </p>
              )}
              
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

export default Victory;