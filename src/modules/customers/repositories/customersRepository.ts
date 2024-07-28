import { prisma } from "@config/db.js";

async function create(data: ICreateCustomerRequest) {
  const customer = await prisma.customer.create({
    data: {
      ...data,
    },
  });

  return customer;
}
async function findByName(name: string) {
  const customer = await prisma.customer.findFirst({
    where: {
      name,
    },
  });

  return customer;
}

async function findById(id: number) {
  const customer = await prisma.customer.findFirst({
    where: {
      id,
    },
  });

  return customer;
}

async function findByEmail(email: string) {
  const customer = await prisma.customer.findFirst({
    where: {
      email,
    },
  });

  return customer;
}

async function findAll() {
  const customers = await prisma.customer.findMany();

  return customers;
}

async function remove(id: number) {
  await prisma.customer.delete({
    where: {
      id,
    },
  });
}

export default {
  create,
  findByName,
  findById,
  findByEmail,
  findAll,
  remove,
};
