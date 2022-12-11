import { Router } from "express";
import { getGames, createGame } from "../controllers/gamesController.js";
import { validateGame } from "../middlewares/createGameMiddleware.js";

const gamesRouter = Router();

gamesRouter.get("/games", getGames);
gamesRouter.post("/games", validateGame, createGame);

export default gamesRouter;
