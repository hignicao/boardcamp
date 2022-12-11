import { connectionDB } from "../database/db.js";
import { customerSchema } from "../schemas/customerSchema.js";

export async function validateCustomer(req, res, next) {
	const { id } = req.params;

	const customer = req.body;
	const { error } = customerSchema.validate(customer, { abortEarly: false });

	if (error) {
		const errors = error.details.map((err) => err.message);
		return res.status(400).send(errors);
	}

  const customerExists = await connectionDB.query(
    `SELECT * FROM customers WHERE cpf = $1;`,
    [customer.cpf]
  );

	if (customerExists.rows.length > 0 && customerExists.rows[0].id != id) {
		return res.status(409).send("Customer already exists");
	}

	next();
}
