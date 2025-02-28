import React, { useState } from 'react';
import { Puzzle as PuzzlePiece, Check, X } from 'lucide-react';
import Button from './Button';
import { Puzzle as PuzzleType } from '../utils/gameData';
import { checkPuzzleSolution, hasRequiredItems } from '../utils/puzzleLogic';
import { useInventory } from '../contexts/InventoryContext';
import { playSoundEffect } from '../utils/soundEffects';

interface PuzzleProps {
  puzzle: PuzzleType;
  onSolve: (puzzleId: string) => void;
  className?: string;
}

const Puzzle: React.FC<PuzzleProps> = ({ puzzle, onSolve, className = '' }) => {
  const [answer, setAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const { items } = useInventory();
  
  const itemIds = items.map((item) => item.id);
  const hasItems = hasRequiredItems(puzzle, itemIds);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const correct = checkPuzzleSolution(puzzle, answer);
    setIsCorrect(correct);
    setShowFeedback(true);
    
    if (correct) {
      playSoundEffect('success');
      onSolve(puzzle.id);
    } else {
      playSoundEffect('error');
      setTimeout(() => {
        setShowFeedback(false);
      }, 2000);
    }
  };
  
  if (puzzle.solved) {
    return (
      <div className={`bg-green-50 p-4 rounded-lg border border-green-200 ${className}`}>
        <div className="flex items-center gap-2 text-green-700">
          <Check className="w-5 h-5" />
          <h3 className="font-medium">{puzzle.name}</h3>
        </div>
        <p className="text-green-600 text-sm mt-2">Puzzle solved!</p>
      </div>
    );
  }
  
  return (
    <div className={`bg-white p-4 rounded-lg border border-gray-200 ${className}`}>
      <div className="flex items-center gap-2 mb-3">
        <PuzzlePiece className="w-5 h-5 text-blue-600" />
        <h3 className="font-medium text-gray-800">{puzzle.name}</h3>
      </div>
      
      <p className="text-gray-600 mb-4">{puzzle.description}</p>
      
      {!hasItems && puzzle.requiredItems && puzzle.requiredItems.length > 0 && (
        <div className="bg-amber-50 p-3 rounded-md mb-4 border border-amber-200">
          <p className="text-amber-700 text-sm">
            You need specific items to solve this puzzle. Keep exploring!
          </p>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Enter your answer"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={!hasItems || puzzle.solved}
          />
        </div>
        
        <Button
          type="submit"
          variant="primary"
          size="sm"
          disabled={!hasItems || puzzle.solved || answer.trim() === ''}
        >
          Submit Answer
        </Button>
        
        {showFeedback && (
          <div
            className={`mt-3 p-2 rounded flex items-center gap-2 ${
              isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}
          >
            {isCorrect ? (
              <>
                <Check className="w-4 h-4" />
                <span>Correct! Puzzle solved.</span>
              </>
            ) : (
              <>
                <X className="w-4 h-4" />
                <span>Incorrect. Try again.</span>
              </>
            )}
          </div>
        )}
      </form>
    </div>
  );
};

export default Puzzle;