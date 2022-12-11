import { connectionDB } from "../database/db.js";

export async function customerExists(req, res, next) {
	const { id } = req.params;

	const customer = await connectionDB.query(`SELECT * FROM customers WHERE id = $1;`, [id]);

	if (customer.rowCount === 0) {
		return res.status(404).send("Customer not found");
	}

	res.locals.customer = customer;

	next();
}