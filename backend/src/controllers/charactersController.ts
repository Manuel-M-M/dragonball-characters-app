import { Request, Response } from "express";
import { fetchCharacters } from "../services/charactersService";

export const getCharacters = async (req: Request, res: Response) => {
  try {
    const data = await fetchCharacters();
    res.json(data);
  } catch (error: any) {
    console.error("❌ Error in getCharacters:", error.message);
    res.status(500).json({ error: "Error fetching characters" });
  }
};
