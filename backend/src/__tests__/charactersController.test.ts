import {
  getCharacterById,
  getCharacters,
} from "../controllers/charactersController";
import {
  fetchCharacterById,
  fetchCharacters,
} from "../services/charactersService";
import { Request, Response } from "express";

jest.mock("../services/charactersService", () => ({
  fetchCharacters: jest.fn(),
  fetchCharacterById: jest.fn(),
}));

describe("Characters Controller", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnValue({ json: jsonMock });

    req = {};
    res = {
      json: jsonMock,
      status: statusMock,
    };

    jest.clearAllMocks();
  });

  it("should return characters successfully", async () => {
    const mockCharacters = { items: [{ id: 1, name: "Goku" }] };
    (fetchCharacters as jest.Mock).mockResolvedValue(mockCharacters);

    await getCharacters(req as Request, res as Response);

    expect(fetchCharacters).toHaveBeenCalledTimes(1);
    expect(jsonMock).toHaveBeenCalledWith(mockCharacters);
  });

  it("should return a 500 error when service fails", async () => {
    (fetchCharacters as jest.Mock).mockRejectedValue(new Error("API failure"));

    await getCharacters(req as Request, res as Response);

    expect(fetchCharacters).toHaveBeenCalledTimes(1);
    expect(statusMock).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({
      error: "Error fetching characters",
    });
  });

  it("should return a character successfully", async () => {
    const mockCharacter = { id: 1, name: "Goku" };
    req = { params: { id: "1" } };
    (fetchCharacterById as jest.Mock).mockResolvedValue(mockCharacter);

    await getCharacterById(req as Request, res as Response);

    expect(fetchCharacterById).toHaveBeenCalledWith(1);
    expect(jsonMock).toHaveBeenCalledWith(mockCharacter);
  });

  it("should return a 500 error when getCharacterById fails", async () => {
    req = { params: { id: "999" } };
    (fetchCharacterById as jest.Mock).mockRejectedValue(
      new Error("Character not found")
    );

    await getCharacterById(req as Request, res as Response);

    expect(fetchCharacterById).toHaveBeenCalledWith(999);
    expect(statusMock).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({
      error: "Error fetching character with ID 999",
    });
  });
});
