import { connectionDB } from "../database/db.js";
import { gameSchema } from "../schemas/gameSchema.js";

export async function validateGame(req, res, next) {
  const game = req.body;
  const { error } = gameSchema.validate(game, { abortEarly: false });

	if (error) {
		const errors = error.details.map((err) => err.message);
		return res.status(400).send(errors);
	}

  const gameExists = await connectionDB.query(
    `SELECT * FROM games WHERE name = $1;`,
    [game.name]
  );

  if(gameExists.rows.length > 0) {
    return res.status(409).send("Game already exists");
  }

  const categoryExists = await connectionDB.query(
    `SELECT * FROM categories WHERE id = $1;`,
    [game.categoryId]
  );

  if(categoryExists.rows.length === 0) {
    return res.status(400).send("Category does not exist");
  }

  next();
}