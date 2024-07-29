import { prisma } from "@config/db.js";

async function findById(id: string) {
  const order = await prisma.order.findFirst({
    where: {
      id,
    },
    include: {
      customer: true,
      products: true,
    },
  });

  return order;
}

async function create({ customer_id, products }: ICreateOrderRequest) {
  const order = await prisma.order.create({
    data: {
      customer_id,
      products: {
        create: products.map((product) => ({
          product: {
            connect: {
              id: product.id,
            },
          },
          quantity: product.quantity,
          price: product.price,
        })),
      },
    },
    select: {
      id: true,
      customer_id: true,
      products: true,
    },
  });

  return order;
}

export default {
  findById,
  create,
};
