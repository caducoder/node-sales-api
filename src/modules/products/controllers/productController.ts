import { NextFunction, Request, Response } from "express";
import productService from "../services/productService.js";

async function ListProducts(req: Request, res: Response, next: NextFunction) {
  try {
    const productList = await productService.ListProductService();

    return res.json(productList);
  } catch (ex: unknown) {
    next(ex);
  }
}

async function ShowProduct(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const product = await productService.ShowProductService(id);

    return res.json(product);
  } catch (ex: unknown) {
    next(ex);
  }
}

async function CreateProduct(req: Request, res: Response) {
  const product = await productService.CreateProductService(req.body);

  return res.json(product);
}

async function UpdateProduct(req: Request, res: Response) {
  const { id } = req.params;
  const updatedproduct = await productService.UpdateProductService(
    id,
    req.body
  );

  return res.json(updatedproduct);
}

async function DeleteProduct(req: Request, res: Response) {
  const { id } = req.params;
  await productService.DeleteProductService(id);
  return res.sendStatus(204);
}

export default {
  ListProducts,
  ShowProduct,
  CreateProduct,
  UpdateProduct,
  DeleteProduct,
};
