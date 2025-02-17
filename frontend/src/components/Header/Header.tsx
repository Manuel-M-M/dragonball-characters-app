import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useFavoritesStore } from '../../store/favoritesStore';

const Navbar = styled.nav`
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: black;
  padding: 16px 48px;
  overflow-x: hidden;
`;

const Logo = styled.img`
  width: 130px;
  height: 52px;
  cursor: pointer;
`;

const FavoritesContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const HeartIcon = styled.div`
  width: 24px;
  height: 21.68px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  svg {
    fill: #ec1d24; // Siempre rojo
    stroke: #ec1d24;
    width: 24px;
    height: 21.68px;
  }
`;

const FavoritesCount = styled.span`
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: white;
  line-height: 18.75px;
`;

export const Header = () => {
  const navigate = useNavigate();
  const favoritesCount = useFavoritesStore((state) => state.favorites.length);

  return (
    <Navbar>
      <Logo
        src="/images/dragon-ball-logo.png"
        alt="Dragon Ball Logo"
        onClick={() => navigate('/characters')}
      />
      <FavoritesContainer onClick={() => navigate('/favorites')}>
        <HeartIcon>
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </HeartIcon>
        <FavoritesCount>{favoritesCount}</FavoritesCount>
      </FavoritesContainer>
    </Navbar>
  );
};
