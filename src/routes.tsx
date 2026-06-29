import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home/Home';
import CharacterDetail from './pages/CharacterDetail/CharacterDetail';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/character/:id',
    element: <CharacterDetail />,
  },
]);