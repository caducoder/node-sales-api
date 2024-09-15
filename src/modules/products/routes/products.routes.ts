import productController from "../controllers/productController.js";
import { createProductSchema, getProductSchema } from "../productSchemas.js";
import { Router } from "express";
import isAuthenticated from "src/middleware/isAuthenticated.js";
import { validateData } from "src/middleware/validationMiddleware.js";

const productsRoutes = Router();

// productsRoutes.use(isAuthenticated)

productsRoutes.get("/", productController.ListProducts);
productsRoutes.get(
  "/:id",
  validateData(getProductSchema),
  productController.ShowProduct
);
productsRoutes.post(
  "/",
  validateData(createProductSchema),
  productController.CreateProduct
);
productsRoutes.put("/:id", productController.UpdateProduct);
productsRoutes.delete("/:id", productController.DeleteProduct);

export default productsRoutes;
