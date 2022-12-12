import { connectionDB } from "../database/db.js";
import { rentalSchema } from "../schemas/rentalSchema.js";
import { format } from "date-fns";


export async function validateRental(req, res, next) {
  const rental = req.body;
  const { error } = rentalSchema.validate(rental, { abortEarly: false });

  if (error) {
    const errors = error.details.map((err) => err.message);
    return res.status(400).send(errors);
  }

  const gameExists = await connectionDB.query(
    `SELECT * FROM games WHERE id = $1;`,
    [rental.gameId]
  );

  if(gameExists.rows.length === 0) {
    return res.status(400).send("Game does not exist");
  }

  const gameIsAvailable = await connectionDB.query(
    `SELECT * FROM rentals WHERE "gameId" = $1 AND "returnDate" IS NULL;`,
    [rental.gameId]
  );

  if(gameIsAvailable.rows.length >= gameExists.rows[0].stockTotal) {
    return res.status(400).send("Game is not available");
  }

  const customerExists = await connectionDB.query(
    `SELECT * FROM customers WHERE id = $1;`,
    [rental.customerId]
  );

  if(customerExists.rows.length === 0) {
    return res.status(400).send("Customer does not exist");
  }

  const rentalItem = {
    customerId: rental.customerId,
    gameId: rental.gameId,
    rentDate: format(new Date(), 'yyyy-MM-dd'),
    daysRented: rental.daysRented,
    returnDate: null,
    originalPrice: gameExists.rows[0].pricePerDay*rental.daysRented,
    delayFee: null
  }

  res.locals.rental = rentalItem;

  next();
}