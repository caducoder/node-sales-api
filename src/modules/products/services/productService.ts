import createHttpError from "http-errors";
import productRepository from "../repositories/productRepository.js";

async function CreateProductService(data: IProductRequest) {
  const productExists = await productRepository.findBydName(data.name);
  if (productExists) {
    throw createHttpError(400, "Product already exists");
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
    throw createHttpError(404, "Product not found");
  }

  return product;
}

async function UpdateProductService(id: string, data: IProductRequest) {
  const product = await productRepository.findById(id);
  if (!product) {
    throw createHttpError(404, "Product not found");
  }

  const productExists = await productRepository.findBydName(data.name);
  if (productExists && data.name !== product.name) {
    throw createHttpError(400, "Product already exists");
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
