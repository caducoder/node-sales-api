import ordersRepository from "../repositories/ordersRepository.js";
import customersRepository from "@modules/customers/repositories/customersRepository.js";
import productsRepository from "@modules/products/repositories/productRepository.js";
import createHttpError from "http-errors";

async function CreateOrderService(data: ICreateOrderRequest) {
  const customerExists = await customersRepository.findById(data.customer_id);

  if (!customerExists) {
    throw createHttpError(400, "Customer not found");
  }

  if (!data.products.length) {
    throw createHttpError(400, "No products found");
  }

  const productsIds = data.products.map((product) => product.id);

  const productsExists = await productsRepository.findAllById(productsIds);

  if (productsExists.length !== productsIds.length) {
    throw createHttpError(400, "One or more products not found");
  }

  const total = data.products.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );

  const order = await ordersRepository.create({ ...data, totalValue: total });

  const { products } = order;

  const updatedProductQuantity = products.map((product) => ({
    id: product.product_id,
    quantity:
      productsExists.filter(
        (productDb) => productDb.id === product.product_id
      )[0].quantity - product.quantity,
  }));

  updatedProductQuantity.forEach(async (product) => {
    await productsRepository.save({
      id: product.id,
      quantity: product.quantity,
    });
  });

  return order;
}

async function ShowOrderService(id: string) {
  const order = await ordersRepository.findById(id);
  if (!order) {
    throw createHttpError(404, "Order not found");
  }

  return order;
}

async function ListOrderService() {
  const orderList = await ordersRepository.findAll();

  return orderList;
}

export default {
  CreateOrderService,
  ShowOrderService,
  ListOrderService,
};
