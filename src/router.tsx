import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Game from './pages/Game';
import Room1 from './pages/Room1';
import Room2 from './pages/Room2';
import Room3 from './pages/Room3';
import Room4 from './pages/Room4';
import Room5 from './pages/Room5';
import GameOver from './pages/GameOver';
import Victory from './pages/Victory';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/game',
    element: <Game />,
    children: [
      {
        path: 'room1',
        element: <Room1 />,
      },
      {
        path: 'room2',
        element: <Room2 />,
      },
      {
        path: 'room3',
        element: <Room3 />,
      },
      {
        path: 'room4',
        element: <Room4 />,
      },
      {
        path: 'room5',
        element: <Room5 />,
      },
    ],
  },
  {
    path: '/game-over',
    element: <GameOver />,
  },
  {
    path: '/victory',
    element: <Victory />,
  },
]);