import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useFavoritesStore } from '../../store/FavoritesStore/favoritesStore';

const Navbar = styled.nav`
  align-items: center;
  background-color: black;
  display: flex;
  height: 100%;
  justify-content: space-between;
  overflow-x: hidden;
  padding: 16px 48px;
`;

const Logo = styled.img`
  cursor: pointer;
  height: 52px;
  width: 130px;
`;

const FavoritesContainer = styled.div`
  align-items: center;
  display: flex;
  gap: 8px;
`;

const HeartIcon = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  height: 21.68px;
  justify-content: center;
  width: 24px;

  svg {
    fill: #ec1d24;
    height: 21.68px;
    stroke: #ec1d24;
    width: 24px;
  }
`;

const FavoritesCount = styled.span`
  color: white;
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 18.75px;
`;

export const Header = () => {
  const navigate = useNavigate();
  const favoritesCount = useFavoritesStore((state) => state.favorites?.length ?? 0);

  return (
    <Navbar>
      <Logo
        src="/images/dragon-ball-logo.webp"
        onError={(e) => {
          e.currentTarget.src =
            'https://upload.wikimedia.org/wikipedia/commons/7/79/Dragon_Ball_Logo.png';
        }}
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
