import orderController from "../controllers/orderController.js";
import { createOrderSchema, showOrderSchema } from "../orderSchema.js";
import { Router } from "express";
import { validateData } from "src/middleware/validationMiddleware.js";

const ordersRoutes = Router();

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

export default ordersRoutes;
