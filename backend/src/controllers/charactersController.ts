import { Request, Response } from "express";
import {
  fetchCharacters,
  fetchCharacterById,
} from "../services/charactersService";

export const getCharacters = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const data = await fetchCharacters();
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: "Error fetching characters" });
  }
};

export const getCharacterById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const character = await fetchCharacterById(Number(id));

    if (!character || Object.keys(character).length === 0) {
      res.status(404).json({ error: `Character with ID ${id} not found` });
      return;
    }

    res.json(character);
  } catch (error: any) {
    res.status(500).json({ error: `Error fetching character with ID ${id}` });
  }
};
