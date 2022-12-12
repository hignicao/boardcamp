import { connectionDB } from "../database/db.js";

export async function validateReturn(req, res, next) {
  const { id } = req.params;

  const rentalExists = await connectionDB.query(
    `SELECT * FROM rentals WHERE id = $1;`,
    [id]
  );

  if (rentalExists.rows.length === 0) {
    return res.status(404).send("Rental not found");
  }

  if (rentalExists.rows[0].returnDate !== null) {
    return res.status(400).send("Rental already returned");
  }

  

  res.locals.rental = rentalExists.rows[0];

  next();
}