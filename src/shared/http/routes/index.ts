import productsRoutes from "@modules/products/routes/products.routes.js";
import { Router } from "express";

const routes = Router();
routes.use("/products", productsRoutes);

export default routes;
