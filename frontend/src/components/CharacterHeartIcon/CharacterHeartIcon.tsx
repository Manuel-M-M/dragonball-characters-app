import { useFavoritesStore } from '../../store/FavoritesStore/favoritesStore';
import styled from 'styled-components';
import { useCallback } from 'react';

interface CharacterHeartIconProps {
  characterId: number;
}

const HeartIconContainer = styled.div<{ $isFavorite: boolean }>`
  align-items: center;
  cursor: pointer;
  display: flex;
  height: 22.84px;
  justify-content: center;
  width: 24px;

  svg {
    fill: ${(props) => (props.$isFavorite ? '#EC1D24' : 'none')};
    stroke: ${(props) => (props.$isFavorite ? '#EC1D24' : '#FFFFFF')};
    transition:
      fill 0.2s ease-in-out,
      stroke 0.2s ease-in-out;
  }
`;

export const CharacterHeartIcon: React.FC<CharacterHeartIconProps> = ({ characterId }) => {
  const addFavorite = useFavoritesStore((state) => state.addFavorite);
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite);
  const isFavorite = useFavoritesStore((state) => state.isFavorite(characterId));

  const toggleFavorite = useCallback(() => {
    if (isFavorite) {
      removeFavorite(characterId);
    } else {
      addFavorite(characterId);
    }
  }, [isFavorite, characterId, addFavorite, removeFavorite]);

  return (
    <HeartIconContainer
      data-testid="favorite-icon"
      $isFavorite={isFavorite}
      onClick={toggleFavorite}
    >
      <svg width="16" height="14.84" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    </HeartIconContainer>
  );
};
