import { Router } from "express";
import { getCustomers, getCustomerById, createCustomer, updateCustomer } from "../controllers/customersController.js";

const customersRouter = Router();

customersRouter.get("/customers", getCustomers);
customersRouter.get("/customers/:id", getCustomerById);
customersRouter.post("/customers", createCustomer);
customersRouter.put("/customers/:id", updateCustomer);

export default customersRouter;
