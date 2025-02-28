import React, { useState } from 'react';
import { DoorOpen, Search } from 'lucide-react';
import { Room as RoomType } from '../utils/gameData';
import Button from './Button';
import Puzzle from './Puzzle';
import { useInventory } from '../contexts/InventoryContext';
import { playSoundEffect } from '../utils/soundEffects';

interface RoomProps {
  room: RoomType;
  onPuzzleSolved: (puzzleId: string) => void;
  onRoomComplete: () => void;
  className?: string;
}

const Room: React.FC<RoomProps> = ({
  room,
  onPuzzleSolved,
  onRoomComplete,
  className = '',
}) => {
  const [inspectingArea, setInspectingArea] = useState<string | null>(null);
  const { addItem, hasItem } = useInventory();
  
  const allPuzzlesSolved = room.puzzles.every((puzzle) => puzzle.solved);
  
  // Areas in the room that can be inspected
  const areas = [
    { id: 'corner', name: 'Dark Corner', description: 'A shadowy corner of the room.' },
    { id: 'desk', name: 'Desk', description: 'An old wooden desk with drawers.' },
    { id: 'bookshelf', name: 'Bookshelf', description: 'A tall bookshelf filled with dusty books.' },
    { id: 'window', name: 'Window', description: 'A window with heavy curtains.' },
    { id: 'painting', name: 'Painting', description: 'A painting hanging on the wall.' },
  ];
  
  const handleInspectArea = (areaId: string) => {
    setInspectingArea(areaId);
    playSoundEffect('click');
    
    // Check if there's an item to find in this area
    const areaItems = room.items.filter((item) => !hasItem(item.id));
    if (areaItems.length > 0 && Math.random() > 0.7) {
      const randomItem = areaItems[Math.floor(Math.random() * areaItems.length)];
      addItem(randomItem);
      playSoundEffect('item_pickup');
    }
  };
  
  const handleProceedToNextRoom = () => {
    playSoundEffect('door_open');
    onRoomComplete();
  };
  
  return (
    <div
      className={`relative min-h-[500px] p-6 rounded-lg overflow-hidden ${className}`}
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${room.backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      
      <div className="relative z-10">
        <h2 className="text-2xl font-bold text-white mb-2">{room.name}</h2>
        <p className="text-gray-200 mb-6">{room.description}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {room.puzzles.map((puzzle) => (
            <Puzzle
              key={puzzle.id}
              puzzle={puzzle}
              onSolve={onPuzzleSolved}
            />
          ))}
        </div>
        
        <div className="bg-white bg-opacity-90 p-4 rounded-lg">
          <h3 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
            <Search className="w-5 h-5 text-blue-600" />
            Inspect Areas
          </h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {areas.map((area) => (
              <Button
                key={area.id}
                variant="secondary"
                size="sm"
                onClick={() => handleInspectArea(area.id)}
              >
                {area.name}
              </Button>
            ))}
          </div>
          
          {inspectingArea && (
            <div className="mt-4 p-3 bg-gray-100 rounded-md">
              <h4 className="font-medium text-gray-800">
                {areas.find((a) => a.id === inspectingArea)?.name}
              </h4>
              <p className="text-sm text-gray-600 mt-1">
                {areas.find((a) => a.id === inspectingArea)?.description}
              </p>
            </div>
          )}
        </div>
        
        {allPuzzlesSolved && room.nextRoom && (
          <div className="mt-6 flex justify-center">
            <Button
              variant="success"
              size="lg"
              onClick={handleProceedToNextRoom}
              className="flex items-center gap-2"
            >
              <DoorOpen className="w-5 h-5" />
              Proceed to Next Room
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Room;