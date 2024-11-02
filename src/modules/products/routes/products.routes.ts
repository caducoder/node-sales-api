import productController from "../controllers/productController.js";
import { createProductSchema, getProductSchema } from "../productSchemas.js";
import { Router } from "express";
import { checkPermission } from "src/middleware/checkPermission.js";
import isAuthenticated from "src/middleware/isAuthenticated.js";
import { validateData } from "src/middleware/validationMiddleware.js";

const productsRoutes = Router();

productsRoutes.get("/", productController.ListProducts);

productsRoutes.use(isAuthenticated);
productsRoutes.get(
  "/:id",
  validateData(getProductSchema),
  productController.ShowProduct
);
productsRoutes.post(
  "/",
  checkPermission("create"),
  validateData(createProductSchema),
  productController.CreateProduct
);
productsRoutes.put(
  "/:id",
  checkPermission("update"),
  productController.UpdateProduct
);
productsRoutes.delete(
  "/:id",
  checkPermission("delete"),
  productController.DeleteProduct
);

export default productsRoutes;
