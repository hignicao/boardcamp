import { Router } from "express";
import { getCustomers, getCustomerById, createCustomer, updateCustomer } from "../controllers/customersController.js";
import { validateCustomer } from "../middlewares/validateCustomerMidddleware.js";
import { customerExists } from "../middlewares/customerExistsMiddleware.js";

const customersRouter = Router();

customersRouter.get("/customers", getCustomers);
customersRouter.get("/customers/:id", customerExists, getCustomerById);
customersRouter.post("/customers", validateCustomer, createCustomer);
customersRouter.put("/customers/:id", customerExists, validateCustomer, updateCustomer);

export default customersRouter;
