import { useState } from 'react';

interface Hint {
  id: string;
  text: string;
  unlocked: boolean;
}

interface UseHintsProps {
  initialHints: Omit<Hint, 'unlocked'>[];
  maxHints?: number;
}

export const useHints = ({ initialHints, maxHints = 3 }: UseHintsProps) => {
  const [hints, setHints] = useState<Hint[]>(
    initialHints.map((hint) => ({ ...hint, unlocked: false }))
  );
  const [hintsUsed, setHintsUsed] = useState(0);

  const unlockHint = (): Hint | null => {
    if (hintsUsed >= maxHints) return null;
    
    const nextLockedHint = hints.find((hint) => !hint.unlocked);
    if (!nextLockedHint) return null;
    
    setHints((prevHints) =>
      prevHints.map((hint) =>
        hint.id === nextLockedHint.id ? { ...hint, unlocked: true } : hint
      )
    );
    
    setHintsUsed((prev) => prev + 1);
    return { ...nextLockedHint, unlocked: true };
  };

  const getUnlockedHints = (): Hint[] => {
    return hints.filter((hint) => hint.unlocked);
  };

  const resetHints = () => {
    setHints(initialHints.map((hint) => ({ ...hint, unlocked: false })));
    setHintsUsed(0);
  };

  const hintsRemaining = maxHints - hintsUsed;

  return {
    hints,
    unlockHint,
    getUnlockedHints,
    resetHints,
    hintsUsed,
    hintsRemaining,
  };
};