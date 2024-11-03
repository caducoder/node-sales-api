import orderController from "../controllers/orderController.js";
import { createOrderSchema, showOrderSchema } from "../orderSchema.js";
import { Router } from "express";
import { checkPermission } from "src/middleware/checkPermission.js";
import isAuthenticated from "src/middleware/isAuthenticated.js";
import { validateData } from "src/middleware/validationMiddleware.js";

const ordersRoutes = Router();

ordersRoutes.use(isAuthenticated);

ordersRoutes.post(
  "/",
  checkPermission("create"),
  validateData(createOrderSchema),
  orderController.CreateOrder
);
ordersRoutes.get(
  "/:id",
  validateData(showOrderSchema),
  orderController.ShowOrder
);

ordersRoutes.get("/", checkPermission("read"), orderController.ListOrders);

export default ordersRoutes;
