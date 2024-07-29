import customerRouter from "@modules/customers/routes/customers.routes.js";
import ordersRoutes from "@modules/orders/routes/orders.routes.js";
import productsRoutes from "@modules/products/routes/products.routes.js";
import sessionsRouter from "@modules/users/routes/sessions.routes.js";
import usersRoutes from "@modules/users/routes/users.routes.js";
import { Router } from "express";

const routes = Router();
routes.use("/products", productsRoutes);
routes.use("/users", usersRoutes);
routes.use("/sessions", sessionsRouter);
routes.use("/customers", customerRouter);
routes.use("/orders", ordersRoutes);

export default routes;
