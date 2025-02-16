import express from "express";
import { getCharacters } from "../controllers/charactersController";

const router = express.Router();

router.get("/", getCharacters);

export default router;
