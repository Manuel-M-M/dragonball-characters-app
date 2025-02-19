import {
  fetchCharacterById,
  fetchCharacters,
} from "../services/charactersService";

describe("Characters Service", () => {
  it("should fetch characters successfully", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ items: [{ id: 1, name: "Goku" }] }),
      })
    ) as jest.Mock;

    const response = await fetchCharacters();
    expect(response.items).toHaveLength(1);
    expect(response.items[0].name).toBe("Goku");
  });

  it("should throw an error if API request fails", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 500,
      })
    ) as jest.Mock;

    await expect(fetchCharacters()).rejects.toThrow(
      "Failed to fetch characters"
    );
  });

  it("should fetch a character by ID successfully", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            id: 1,
            name: "Goku",
            image: "https://dragonball-api.com/characters/goku.png",
          }),
      })
    ) as jest.Mock;

    const response = await fetchCharacterById(1);
    expect(response.id).toBe(1);
    expect(response.name).toBe("Goku");
    expect(response.image).toBe(
      "https://dragonball-api.com/characters/goku.png"
    );
  });

  it("should throw an error if fetching a character by ID fails", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 500,
      })
    ) as jest.Mock;

    await expect(fetchCharacterById(999)).rejects.toThrow(
      "Failed to fetch character with ID 999"
    );
  });
});
