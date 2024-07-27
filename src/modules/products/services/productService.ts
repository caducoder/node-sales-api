import AppError from "@shared/errors/AppError.js";
import productRepository from "../repositories/productRepository.js";

async function CreateProductService(data: IProductRequest) {
  const productExists = await productRepository.findBydName(data.name);
  if (productExists) {
    throw new AppError("Product already exists", 400);
  }
  const product = await productRepository.create(data);

  return product;
}

async function ListProductService() {
  const products = await productRepository.findAll();

  return products;
}

async function ShowProductService(id: string) {
  const product = await productRepository.findById(id);
  if (!product) {
    throw new AppError("Product not found", 404);
  }

  return product;
}

async function UpdateProductService(id: string, data: IProductRequest) {
  const product = await productRepository.findById(id);
  if (!product) {
    throw new AppError("Product not found", 404);
  }

  const productExists = await productRepository.findBydName(data.name);
  if (productExists && data.name !== product.name) {
    throw new AppError("Product already exists", 400);
  }

  product.name = data.name;
  product.price = data.price;
  product.quantity = data.quantity;

  await productRepository.save(product);

  return product;
}

async function DeleteProductService(id: string) {
  await productRepository.remove(id);
}

export default {
  CreateProductService,
  ListProductService,
  ShowProductService,
  UpdateProductService,
  DeleteProductService,
};
