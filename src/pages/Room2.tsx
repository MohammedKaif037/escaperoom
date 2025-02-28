import React from 'react';
import { useOutletContext } from 'react-router-dom';
import Room from '../components/Room';
import { Room as RoomType } from '../utils/gameData';

interface RoomContextType {
  room: RoomType;
  onPuzzleSolved: (puzzleId: string) => void;
  onRoomComplete: () => void;
}

const Room2: React.FC = () => {
  const { room, onPuzzleSolved, onRoomComplete } = useOutletContext<RoomContextType>();
  
  return (
    <Room
      room={room}
      onPuzzleSolved={onPuzzleSolved}
      onRoomComplete={onRoomComplete}
    />
  );
};

export default Room2;