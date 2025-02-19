import express from "express";
import {
  getCharacters,
  getCharacterById,
} from "../controllers/charactersController";

const router = express.Router();

router.get("/", getCharacters);
router.get("/:id", getCharacterById);

export default router;
