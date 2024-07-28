import productsRoutes from "@modules/products/routes/products.routes.js";
import usersRoutes from "@modules/users/routes/users.routes.js";
import { Router } from "express";

const routes = Router();
routes.use("/products", productsRoutes);
routes.use("/users", usersRoutes);

export default routes;
