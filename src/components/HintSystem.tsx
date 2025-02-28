import React, { useState } from 'react';
import { HelpCircle, AlertCircle } from 'lucide-react';
import Button from './Button';

interface HintSystemProps {
  hints: { id: string; text: string }[];
  hintsUsed: number;
  hintsRemaining: number;
  onRequestHint: () => void;
  className?: string;
}

const HintSystem: React.FC<HintSystemProps> = ({
  hints,
  hintsUsed,
  hintsRemaining,
  onRequestHint,
  className = '',
}) => {
  const [showHints, setShowHints] = useState(false);
  
  const unlockedHints = hints.slice(0, hintsUsed);
  
  return (
    <div className={`bg-gray-100 p-4 rounded-lg shadow-md ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-gray-700" />
          <h2 className="text-lg font-semibold text-gray-800">Hints</h2>
        </div>
        <span className="text-sm text-gray-600">
          {hintsRemaining} hint{hintsRemaining !== 1 ? 's' : ''} remaining
        </span>
      </div>
      
      <div className="flex flex-col gap-3">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onRequestHint()}
          disabled={hintsRemaining <= 0}
        >
          Get Hint
        </Button>
        
        {unlockedHints.length > 0 && (
          <Button
            variant="primary"
            size="sm"
            onClick={() => setShowHints(!showHints)}
          >
            {showHints ? 'Hide Hints' : 'Show Hints'}
          </Button>
        )}
      </div>
      
      {showHints && unlockedHints.length > 0 && (
        <div className="mt-4 space-y-2">
          {unlockedHints.map((hint, index) => (
            <div
              key={hint.id}
              className="p-3 bg-white rounded border border-gray-200 flex gap-2"
            >
              <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-700">Hint {index + 1}</p>
                <p className="text-sm text-gray-600">{hint.text}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {unlockedHints.length === 0 && (
        <p className="text-sm text-gray-500 italic mt-3">
          No hints used yet. Click "Get Hint" if you need help.
        </p>
      )}
    </div>
  );
};

export default HintSystem;