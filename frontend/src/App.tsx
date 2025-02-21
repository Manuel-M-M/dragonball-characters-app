import React, { lazy, useEffect, Suspense } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { GlobalStyles } from './styles/globalStyles';
import { Header } from './components/Header/Header';

const CharactersListPage = lazy(() =>
  import('./pages/CharactersListPage/CharactersListPage').then((m) => ({
    default: m.CharactersListPage,
  })),
);
const FavoritesListPage = lazy(() =>
  import('./pages/FavoritesListPage/FavoritesListPage').then((m) => ({
    default: m.FavoritesListPage,
  })),
);
const CharacterDetailsPage = lazy(() =>
  import('./pages/CharacterDetailsPage/CharacterDetailsPage').then((m) => ({
    default: m.CharacterDetailsPage,
  })),
);

const theme = {
  breakpoints: {
    sm: '480px',
    md: '768px',
    lg: '1024px',
  },
};

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
import { Loader } from './components/Loader/Loader';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <ScrollToTop />
        <GlobalStyles />
        <AppContainer className="AppContainer">
          <Header />
          <MainContent className="MainContent-App">
            <Routes>
              <Route path="/" element={<Navigate to="/characters" />} />
              <Route
                path="/characters"
                element={
                  <Suspense fallback={<Loader />}>
                    <CharactersListPage />
                  </Suspense>
                }
              />
              <Route
                path="/favorites"
                element={
                  <Suspense fallback={<Loader />}>
                    <FavoritesListPage />
                  </Suspense>
                }
              />
              <Route
                path="/character/:id"
                element={
                  <Suspense fallback={<Loader />}>
                    <CharacterDetailsPage />
                  </Suspense>
                }
              />
            </Routes>
          </MainContent>
        </AppContainer>
      </Router>
    </ThemeProvider>
  );
};

export default App;
