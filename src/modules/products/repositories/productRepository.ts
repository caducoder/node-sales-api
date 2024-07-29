import { prisma } from "@config/db.js";

async function create(data: IProductRequest) {
  const product = await prisma.product.create({
    data: {
      ...data,
    },
  });

  return product;
}
async function findBydName(name: string) {
  const product = await prisma.product.findFirst({
    where: {
      name,
    },
  });

  return product;
}

async function findAll() {
  const products = await prisma.product.findMany();
  return products;
}

async function findById(id: string) {
  const product = await prisma.product.findFirst({
    where: {
      id,
    },
  });

  return product;
}

async function findAllById(productsIds: string[]) {
  const products = await prisma.product.findMany({
    where: {
      id: { in: productsIds },
    },
  });

  return products;
}

async function save(product: Partial<Product>) {
  await prisma.product.update({
    where: {
      id: product.id,
    },
    data: product,
  });
}

async function remove(id: string) {
  await prisma.product.delete({
    where: {
      id,
    },
  });
}

export default {
  create,
  findBydName,
  findAll,
  findById,
  save,
  remove,
  findAllById,
};
