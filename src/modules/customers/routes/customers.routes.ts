import customerController from "../controllers/customerController.js";
import { Router } from "express";
import { checkPermission } from "src/middleware/checkPermission.js";
import isAuthenticated from "src/middleware/isAuthenticated.js";
import { validateData } from "src/middleware/validationMiddleware.js";

const customerRouter = Router();

customerRouter.use(isAuthenticated);

customerRouter.get(
  "/",
  checkPermission("read"),
  customerController.ListCustomer
);
customerRouter.post(
  "/",
  checkPermission("create"),
  customerController.CreateCustomer
);
customerRouter.delete(
  "/:id",
  checkPermission("delete"),
  customerController.RemoveCustomer
);

export default customerRouter;
