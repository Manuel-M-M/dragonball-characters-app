export const fetchCharacters = async () => {
  const response = await fetch("https://dragonball-api.com/api/characters");
  if (!response.ok) throw new Error("Failed to fetch characters");
  return response.json();
};
