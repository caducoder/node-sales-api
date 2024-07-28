import customerController from "../controllers/customerController.js";
import { Router } from "express";
import isAuthenticated from "src/middleware/isAuthenticated.js";
import { validateData } from "src/middleware/validationMiddleware.js";

const customerRouter = Router();

customerRouter.get("/", customerController.ListCustomer);
customerRouter.post("/", isAuthenticated, customerController.CreateCustomer);
customerRouter.delete("/:id", customerController.RemoveCustomer);

export default customerRouter;
