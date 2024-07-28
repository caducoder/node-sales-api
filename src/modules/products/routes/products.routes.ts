import { Router } from "express";
import productController from "../controllers/productController.js";
import { validateData } from "src/middleware/validationMiddleware.js";
import { createProductSchema, getProductSchema } from "../productSchemas.js";
const productsRoutes = Router();

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
