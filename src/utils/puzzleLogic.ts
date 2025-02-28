import { Puzzle } from './gameData';

// Check if a puzzle solution is correct
export const checkPuzzleSolution = (puzzle: Puzzle, answer: string): boolean => {
  return puzzle.solution.toLowerCase() === answer.toLowerCase();
};

// Check if a player has all required items for a puzzle
export const hasRequiredItems = (puzzle: Puzzle, inventory: string[]): boolean => {
  if (!puzzle.requiredItems || puzzle.requiredItems.length === 0) return true;
  
  return puzzle.requiredItems.every((itemId) => inventory.includes(itemId));
};

// Generate a hint for a puzzle based on the hint level
export const getHint = (puzzle: Puzzle, hintLevel: number): string | null => {
  if (hintLevel < 1 || hintLevel > puzzle.hints.length) return null;
  return puzzle.hints[hintLevel - 1].text;
};

// Check if all puzzles in a room are solved
export const areAllPuzzlesSolved = (puzzles: Puzzle[]): boolean => {
  return puzzles.every((puzzle) => puzzle.solved);
};

// Get the next unsolved puzzle in a room
export const getNextUnsolvedPuzzle = (puzzles: Puzzle[]): Puzzle | null => {
  return puzzles.find((puzzle) => !puzzle.solved) || null;
};

// Mark a puzzle as solved
export const solvePuzzle = (puzzles: Puzzle[], puzzleId: string): Puzzle[] => {
  return puzzles.map((puzzle) =>
    puzzle.id === puzzleId ? { ...puzzle, solved: true } : puzzle
  );
};