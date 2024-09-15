import orderController from "../controllers/orderController.js";
import { createOrderSchema, showOrderSchema } from "../orderSchema.js";
import { Router } from "express";
import isAuthenticated from "src/middleware/isAuthenticated.js";
import { validateData } from "src/middleware/validationMiddleware.js";

const ordersRoutes = Router();

ordersRoutes.use(isAuthenticated);

ordersRoutes.post(
  "/",
  validateData(createOrderSchema),
  orderController.CreateOrder
);
ordersRoutes.get(
  "/:id",
  validateData(showOrderSchema),
  orderController.ShowOrder
);

ordersRoutes.get("/", orderController.ListOrders);

export default ordersRoutes;
