import { useEffect, useState } from 'react';
import { CharactersService } from '../../application/CharactersService';
import { CharacterList } from '../../components/CharacterList/CharacterList';
import { CharactersRepository } from '../../infrastructure/CharactersRepository';

export const CharactersListPage = () => {
  const [characters, setCharacters] = useState<
    { id: number; name: string; image: string }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const service = new CharactersService(new CharactersRepository());
        const response = await service.getCharacters();
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

  return <CharacterList characters={characters} />;
};
