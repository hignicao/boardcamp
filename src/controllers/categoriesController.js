import { connectionDB } from "../database/db.js";

export async function getCategories(req, res) {
  try {
    const categories = await connectionDB.query(
      `SELECT * FROM categories;`
    );
    res.send(categories.rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function createCategory(req, res) {
	const { name } = req.body;

	try {
		await connectionDB.query(
      `INSERT INTO categories (name) VALUES ($1);`,
      [name]
    );
    res.sendStatus(201);
	} catch (error) {
		res.status(500).send(error.message);
	}
}