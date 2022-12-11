import { connectionDB } from "../database/db.js";
import { categorySchema } from "../schemas/categorySchema.js";

export async function validateCategory(req, res, next) {
  const category = req.body;
  const { error } = categorySchema.validate(category, { abortEarly: false });

	if (error) {
		const errors = error.details.map((err) => err.message);
		return res.status(400).send(errors);
	}

  const categoryExists = await connectionDB.query(
    `SELECT * FROM categories WHERE name = $1;`,
    [category.name]
  );

  if(categoryExists.rows.length > 0) {
    return res.status(409).send("Category already exists");
  }

  next();
}