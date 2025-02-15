import { useEffect, useState } from 'react';
import { CharactersRepository } from '../../infrastructure/CharactersRepository';
import { CharacterCard } from '../../components/CharacterCard/CharacterCard';
import styled from 'styled-components';

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  padding: 20px;
`;

export const CharactersListPage = () => {
  const [characters, setCharacters] = useState<
    { id: number; name: string; image: string }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const repo = new CharactersRepository();
        const response = await repo.getCharacters();
        setCharacters(response.items);
      } catch (err) {
        setError('Failed to fetch characters');
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <ListContainer>
      {characters.map((char) => (
        <CharacterCard key={char.id} name={char.name} image={char.image} />
      ))}
    </ListContainer>
  );
};
