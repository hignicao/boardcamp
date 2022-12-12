import { Router } from "express";
import { getRentals, createRental, returnRental, deleteRental } from "../controllers/rentalsController.js";
import { validateRental } from "../middlewares/createRentalMiddleware.js";
import { validateDeletion } from "../middlewares/validateDeletionRentalMiddleware.js";
import { validateReturn } from "../middlewares/validateReturnRentalMiddleware.js";

const rentalsRouter = Router();

rentalsRouter.get("/rentals", getRentals);
rentalsRouter.post("/rentals", validateRental, createRental);
rentalsRouter.post("/rentals/:id/return", validateReturn, returnRental);
rentalsRouter.delete("/rentals/:id", validateDeletion, deleteRental);

export default rentalsRouter;
