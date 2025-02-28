import { InventoryItem } from '../contexts/InventoryContext';

export interface Puzzle {
  id: string;
  name: string;
  description: string;
  solved: boolean;
  requiredItems?: string[];
  hints: { id: string; text: string }[];
  solution: string;
}

export interface Room {
  id: number;
  name: string;
  description: string;
  backgroundImage: string;
  puzzles: Puzzle[];
  items: InventoryItem[];
  nextRoom: number | null;
  isLocked: boolean;
}

// Inventory items
export const gameItems: Record<string, InventoryItem> = {
  key1: {
    id: 'key1',
    name: 'Brass Key',
    description: 'An old brass key with intricate patterns.',
    image: 'https://images.unsplash.com/photo-1607644536940-6c300b5784c5?auto=format&fit=crop&q=80&w=200&h=200',
    canCombine: false,
  },
  key2: {
    id: 'key2',
    name: 'Silver Key',
    description: 'A shiny silver key with a square head.',
    image: 'https://images.unsplash.com/photo-1582879304171-8041c73224b0?auto=format&fit=crop&q=80&w=200&h=200',
    canCombine: false,
  },
  screwdriver: {
    id: 'screwdriver',
    name: 'Screwdriver',
    description: 'A small flathead screwdriver.',
    image: 'https://images.unsplash.com/photo-1586864387789-628af9feed72?auto=format&fit=crop&q=80&w=200&h=200',
    canCombine: true,
    combinesWith: ['battery'],
  },
  battery: {
    id: 'battery',
    name: 'Battery',
    description: 'A small AA battery.',
    image: 'https://images.unsplash.com/photo-1619641464045-b230b1d788c9?auto=format&fit=crop&q=80&w=200&h=200',
    canCombine: true,
    combinesWith: ['screwdriver'],
  },
  flashlight: {
    id: 'flashlight',
    name: 'Flashlight',
    description: 'A flashlight without batteries.',
    image: 'https://images.unsplash.com/photo-1590534247854-e97ab8c3bf47?auto=format&fit=crop&q=80&w=200&h=200',
    canCombine: true,
    combinesWith: ['battery_screwdriver'],
  },
  battery_screwdriver: {
    id: 'battery_screwdriver',
    name: 'Battery with Screwdriver',
    description: 'A battery with a screwdriver attached to it.',
    image: 'https://images.unsplash.com/photo-1590534247854-e97ab8c3bf47?auto=format&fit=crop&q=80&w=200&h=200',
    canCombine: true,
    combinesWith: ['flashlight'],
  },
  working_flashlight: {
    id: 'working_flashlight',
    name: 'Working Flashlight',
    description: 'A working flashlight with batteries installed.',
    image: 'https://images.unsplash.com/photo-1590534247854-e97ab8c3bf47?auto=format&fit=crop&q=80&w=200&h=200',
    canCombine: false,
  },
  note: {
    id: 'note',
    name: 'Mysterious Note',
    description: 'A handwritten note with a cryptic message.',
    image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&q=80&w=200&h=200',
    canCombine: false,
  },
};

// Room data
export const rooms: Room[] = [
  {
    id: 1,
    name: 'Study Room',
    description: 'A dimly lit study with bookshelves and a desk.',
    backgroundImage: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=1000',
    puzzles: [
      {
        id: 'bookshelf_puzzle',
        name: 'Bookshelf Puzzle',
        description: 'Arrange the books in the correct order to reveal a hidden compartment.',
        solved: false,
        hints: [
          { id: 'hint1', text: 'Look at the colors of the book spines.' },
          { id: 'hint2', text: 'The books should be arranged in rainbow order.' },
          { id: 'hint3', text: 'Red, Orange, Yellow, Green, Blue, Indigo, Violet.' },
        ],
        solution: 'ROYGBIV',
      },
      {
        id: 'desk_puzzle',
        name: 'Desk Drawer',
        description: 'The desk drawer is locked with a 3-digit combination.',
        solved: false,
        hints: [
          { id: 'hint1', text: 'Look for numbers hidden around the room.' },
          { id: 'hint2', text: 'Check the books on the shelf for highlighted numbers.' },
          { id: 'hint3', text: 'The combination is 425.' },
        ],
        solution: '425',
      },
    ],
    items: [gameItems.screwdriver, gameItems.note],
    nextRoom: 2,
    isLocked: false,
  },
  {
    id: 2,
    name: 'Laboratory',
    description: 'A scientific laboratory with various equipment and experiments.',
    backgroundImage: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&q=80&w=1000',
    puzzles: [
      {
        id: 'chemical_puzzle',
        name: 'Chemical Mixture',
        description: 'Mix the correct chemicals to create a solution that will dissolve the lock.',
        solved: false,
        hints: [
          { id: 'hint1', text: 'The colors of the chemicals are important.' },
          { id: 'hint2', text: 'Mix the blue and yellow chemicals first, then add the red one.' },
          { id: 'hint3', text: 'The correct sequence is: Blue, Yellow, Red.' },
        ],
        solution: 'BYR',
      },
      {
        id: 'electrical_puzzle',
        name: 'Electrical Circuit',
        description: 'Connect the wires to complete the circuit and power the door.',
        solved: false,
        requiredItems: ['working_flashlight'],
        hints: [
          { id: 'hint1', text: 'The circuit diagram is hidden somewhere in the room.' },
          { id: 'hint2', text: 'You need to connect the red wire to the blue terminal, and the green wire to the yellow terminal.' },
          { id: 'hint3', text: 'The correct sequence is: Red-Blue, Green-Yellow.' },
        ],
        solution: 'RBGY',
      },
    ],
    items: [gameItems.battery, gameItems.key1],
    nextRoom: 3,
    isLocked: true,
  },
  {
    id: 3,
    name: 'Library',
    description: 'An old library with dusty bookshelves and ancient manuscripts.',
    backgroundImage: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=1000',
    puzzles: [
      {
        id: 'manuscript_puzzle',
        name: 'Ancient Manuscript',
        description: 'Decipher the ancient text to find the hidden message.',
        solved: false,
        hints: [
          { id: 'hint1', text: 'The manuscript uses a simple substitution cipher.' },
          { id: 'hint2', text: 'Each letter is shifted three places forward in the alphabet.' },
          { id: 'hint3', text: 'The decoded message is "BENEATH THE STATUE".' },
        ],
        solution: 'BENEATH THE STATUE',
      },
    ],
    items: [gameItems.flashlight],
    nextRoom: 4,
    isLocked: true,
  },
  {
    id: 4,
    name: 'Art Gallery',
    description: 'A room filled with paintings and sculptures.',
    backgroundImage: 'https://images.unsplash.com/photo-1545033131-485ea67fd7c3?auto=format&fit=crop&q=80&w=1000',
    puzzles: [
      {
        id: 'painting_puzzle',
        name: 'Hidden Painting',
        description: 'Find the painting that doesn\'t belong and reveal what\'s behind it.',
        solved: false,
        hints: [
          { id: 'hint1', text: 'Look at the artists\' signatures on each painting.' },
          { id: 'hint2', text: 'One signature doesn\'t match the style of the painting.' },
          { id: 'hint3', text: 'The painting with the forged signature is the landscape with mountains.' },
        ],
        solution: 'LANDSCAPE',
      },
      {
        id: 'statue_puzzle',
        name: 'Statue Riddle',
        description: 'Solve the riddle inscribed on the base of the statue.',
        solved: false,
        hints: [
          { id: 'hint1', text: 'The riddle refers to something that\'s in the room.' },
          { id: 'hint2', text: 'It\'s talking about a mirror.' },
          { id: 'hint3', text: 'Look for a hidden mirror or reflective surface in the room.' },
        ],
        solution: 'MIRROR',
      },
    ],
    items: [gameItems.key2],
    nextRoom: 5,
    isLocked: true,
  },
  {
    id: 5,
    name: 'Final Chamber',
    description: 'The final room with the exit door.',
    backgroundImage: 'https://images.unsplash.com/photo-1536854150886-354a3b64b8c3?auto=format&fit=crop&q=80&w=1000',
    puzzles: [
      {
        id: 'final_puzzle',
        name: 'Exit Lock',
        description: 'Solve the final puzzle to unlock the exit door.',
        solved: false,
        requiredItems: ['key1', 'key2'],
        hints: [
          { id: 'hint1', text: 'You need both keys to unlock the door.' },
          { id: 'hint2', text: 'Insert the brass key first, then the silver key.' },
          { id: 'hint3', text: 'Turn the brass key left, and the silver key right.' },
        ],
        solution: 'BLSR', // Brass Left, Silver Right
      },
    ],
    items: [],
    nextRoom: null,
    isLocked: true,
  },
];

// Get room by ID
export const getRoomById = (id: number): Room | undefined => {
  return rooms.find((room) => room.id === id);
};

// Get puzzle by ID
export const getPuzzleById = (puzzleId: string): Puzzle | undefined => {
  for (const room of rooms) {
    const puzzle = room.puzzles.find((p) => p.id === puzzleId);
    if (puzzle) return puzzle;
  }
  return undefined;
};

// Item combinations
export const itemCombinations: Record<string, InventoryItem> = {
  'battery_screwdriver': {
    id: 'battery_screwdriver',
    name: 'Battery with Screwdriver',
    description: 'A battery with the screwdriver attached to it.',
    image: 'https://images.unsplash.com/photo-1590534247854-e97ab8c3bf47?auto=format&fit=crop&q=80&w=200&h=200',
    canCombine: true,
    combinesWith: ['flashlight'],
  },
  'working_flashlight': {
    id: 'working_flashlight',
    name: 'Working Flashlight',
    description: 'A flashlight with batteries installed.',
    image: 'https://images.unsplash.com/photo-1590534247854-e97ab8c3bf47?auto=format&fit=crop&q=80&w=200&h=200',
    canCombine: false,
  },
};

// Check if two items can be combined
export const canCombineItems = (item1Id: string, item2Id: string): boolean => {
  const item1 = gameItems[item1Id];
  const item2 = gameItems[item2Id];
  
  if (!item1 || !item2) return false;
  if (!item1.canCombine || !item2.canCombine) return false;
  
  return (
    (item1.combinesWith?.includes(item2Id) || item2.combinesWith?.includes(item1Id)) ?? false
  );
};

// Get the result of combining two items
export const getCombinedItem = (item1Id: string, item2Id: string): InventoryItem | null => {
  if (!canCombineItems(item1Id, item2Id)) return null;
  
  // Define specific combinations
  if (
    (item1Id === 'battery' && item2Id === 'screwdriver') ||
    (item1Id === 'screwdriver' && item2Id === 'battery')
  ) {
    return itemCombinations.battery_screwdriver;
  }
  
  if (
    (item1Id === 'battery_screwdriver' && item2Id === 'flashlight') ||
    (item1Id === 'flashlight' && item2Id === 'battery_screwdriver')
  ) {
    return itemCombinations.working_flashlight;
  }
  
  return null;
};