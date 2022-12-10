import { Router } from "express";
import categoriesRouter from "./categoriesRoutes";
import customersRouter from "./customersRoutes";
import gamesRouter from "./gamesRoutes";
import rentalsRouter from "./rentalsRoutes";

const router = Router();

router.use(categoriesRouter);
router.use(gamesRouter);
router.use(customersRouter);
router.use(rentalsRouter);

export default router;
