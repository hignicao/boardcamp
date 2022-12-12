import { connectionDB } from "../database/db.js";

export async function getRentals(req, res) {
  const searchByCustomer = req.query.customerId;
  const searchByGame = req.query.gameId;

  try {
    if (searchByCustomer) {
      const rentals = await connectionDB.query(
        ` SELECT rentals.*,

        JSON_BUILD_OBJECT(
          'id', customers.id,
          'name', customers.name
        ) AS "customer",

        JSON_BUILD_OBJECT(
          'id', games.id,
          'name', games.name,
          'categoryId', games."categoryId",
          'categoryName', categories.name
        ) AS "game"

        FROM rentals
        JOIN customers ON rentals."customerId" = customers.id
        JOIN games ON rentals."gameId" = games.id
        JOIN categories ON games."categoryId" = categories.id
        WHERE customers.id = $1;`,
				[searchByCustomer]
      );
      res.send(rentals.rows);
      return;
    }

    if (searchByGame) {
      const rentals = await connectionDB.query(
        ` SELECT rentals.*,

        JSON_BUILD_OBJECT(
          'id', customers.id,
          'name', customers.name
        ) AS "customer",

        JSON_BUILD_OBJECT(
          'id', games.id,
          'name', games.name,
          'categoryId', games."categoryId",
          'categoryName', categories.name
        ) AS "game"

        FROM rentals
        JOIN customers ON rentals."customerId" = customers.id
        JOIN games ON rentals."gameId" = games.id
        JOIN categories ON games."categoryId" = categories.id
        WHERE games.id = $1;`,
				[searchByGame]
      );
      res.send(rentals.rows);
      return;
    }

    const rentals = await connectionDB.query(
      ` SELECT rentals.*,

      JSON_BUILD_OBJECT(
        'id', customers.id,
        'name', customers.name
      ) AS "customer",

      JSON_BUILD_OBJECT(
        'id', games.id,
        'name', games.name,
        'categoryId', games."categoryId",
        'categoryName', categories.name
      ) AS "game"

      FROM rentals
      JOIN customers ON rentals."customerId" = customers.id
      JOIN games ON rentals."gameId" = games.id
      JOIN categories ON games."categoryId" = categories.id;`
    );
    res.send(rentals.rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function createRental(req, res) {
  const rental = res.locals.rental;

  try {
    await connectionDB.query(
      `INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee")
      VALUES ($1, $2, $3, $4, $5, $6, $7);`,
      [rental.customerId, rental.gameId, rental.rentDate, rental.daysRented, rental.returnDate, rental.originalPrice, rental.delayFee]
    );
		res.sendStatus(201);
  } catch (error) {
		res.status(500).send(error.message);
  }
}

export async function returnRental(req, res) {

}

export async function deleteRental(req, res) {
  const { id } = req.params;

  try {
    await connectionDB.query(
      `DELETE FROM rentals
      WHERE id = $1;`,
      [id]
    );
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send(error.message);
  }
}