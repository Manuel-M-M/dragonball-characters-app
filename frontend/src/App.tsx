import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { CharactersListPage } from './pages/CharactersListPage/CharactersListPage';
// import { FavoritesListPage } from './pages/FavoritesListPage/FavoritesListPage';
// import { CharacterDetailsPage } from './pages/CharacterDetailsPage/CharacterDetailsPage';
import { Header } from './components/Header/Header';

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/characters" />} />
        <Route path="/characters" element={<CharactersListPage />} />
        {/* <Route path="/favorites" element={<FavoritesListPage />} />
        <Route path="/character/:id" element={<CharacterDetailsPage />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
