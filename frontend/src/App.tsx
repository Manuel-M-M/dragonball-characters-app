import React from 'react';
import styled from 'styled-components';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { CharactersListPage } from './pages/CharactersListPage/CharactersListPage';
import { FavoritesListPage } from './pages/FavoritesListPage/FavoritesListPage';
// import { CharacterDetailsPage } from './pages/CharacterDetailsPage/CharacterDetailsPage';
import { GlobalStyles } from './styles/globalStyles';
import { Header } from './components/Header/Header';

const AppContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #f0f0f0; // Color tomado de Figma
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
`;

const MainContent = styled.main`
  flex: 1;
  width: 100%;
  padding: 16px 48px; // Basado en el diseño de Figma
  justify-content: center;
`;

const App: React.FC = () => {
  return (
    <Router>
      <GlobalStyles />
      <AppContainer>
        <Header />
        <MainContent>
          <Routes>
            <Route path="/" element={<Navigate to="/characters" />} />
            <Route path="/characters" element={<CharactersListPage />} />
            <Route path="/favorites" element={<FavoritesListPage />} />
            {/* <Route path="/character/:id" element={<CharacterDetailsPage />} /> */}
          </Routes>
        </MainContent>
      </AppContainer>
    </Router>
  );
};

export default App;
