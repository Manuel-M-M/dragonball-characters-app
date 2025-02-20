import React, { useEffect } from 'react';
import styled from 'styled-components';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { CharactersListPage } from './pages/CharactersListPage/CharactersListPage';
import { FavoritesListPage } from './pages/FavoritesListPage/FavoritesListPage';
import { CharacterDetailsPage } from './pages/CharacterDetailsPage/CharacterDetailsPage';
import { GlobalStyles } from './styles/globalStyles';
import { Header } from './components/Header/Header';

const AppContainer = styled.div`
  width: 100%;
  height: 1182px
  background-color: #f0f0f0; // Color tomado de Figma
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
`;

const MainContent = styled.main`
  flex: 1;
  width: 100%;
  justify-content: center;
`;

import { useLocation } from 'react-router-dom';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <GlobalStyles />
      <AppContainer className="AppContainer">
        <Header />
        <MainContent className="MainContent-App">
          <Routes>
            <Route path="/" element={<Navigate to="/characters" />} />
            <Route path="/characters" element={<CharactersListPage />} />
            <Route path="/favorites" element={<FavoritesListPage />} />
            <Route path="/character/:id" element={<CharacterDetailsPage />} />
          </Routes>
        </MainContent>
      </AppContainer>
    </Router>
  );
};

export default App;
