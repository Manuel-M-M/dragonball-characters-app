export const fetchCharacters = async (page = 1, limit = 50) => {
  const response = await fetch(
    `https://dragonball-api.com/api/characters?page=${page}&limit=${limit}`
  );
  if (!response.ok) throw new Error("Failed to fetch characters");
  return response.json();
};

export const fetchCharacterById = async (id: number) => {
  const response = await fetch(
    `https://dragonball-api.com/api/characters/${id}`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch character with ID ${id}`);
  }

  const data = await response.json();

  return data.items ? data.items[0] : data;
};
