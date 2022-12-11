import { connectionDB } from "../database/db.js";

export async function getCustomers(req, res) {
  const search = req.query.cpf;

  try {
    if (search) {
      const customers = await connectionDB.query(
        `SELECT * FROM customers WHERE cpf ILIKE $1;`,
        [`${search}%`]
      );
      res.send(customers.rows);
      return;
    }

    const customers = await connectionDB.query(
      `SELECT * FROM customers;`
    );
    res.send(customers.rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function getCustomerById(req, res) {
  const customer = res.locals.customer;

  try {
    res.send(customer.rows[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function createCustomer(req, res) {
	const { name, phone, cpf, birthday } = req.body;

	try {
		await connectionDB.query(
			`INSERT INTO customers (name, phone, cpf, birthday)
      VALUES ($1, $2, $3, $4);`,
			[name, phone, cpf, birthday]
		);
		res.sendStatus(201);
	} catch (error) {
		res.status(500).send(error.message);
	}
}

export async function updateCustomer(req, res) {
  const { id } = req.params;
  const { name, phone, cpf, birthday } = req.body;

  try {
    await connectionDB.query(
      `UPDATE customers SET name = $1, phone = $2, cpf = $3, birthday = $4
      WHERE id = $5;`,
      [name, phone, cpf, birthday, id]
    );
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
