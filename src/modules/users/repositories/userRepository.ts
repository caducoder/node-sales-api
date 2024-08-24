import { prisma } from "@config/db.js";

async function create(data: ICreateUserRequest) {
  const user = await prisma.user.create({
    data: {
      ...data,
    },
  });

  return user;
}
async function findByName(name: string) {
  const user = await prisma.user.findFirst({
    where: {
      name,
    },
  });

  return user;
}

async function findById(id: string) {
  const user = await prisma.user.findFirst({
    where: {
      id,
    },
  });

  return user;
}

async function findByEmail(email: string) {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  return user;
}

async function findAll() {
  const users = await prisma.user.findMany();

  return users;
}

async function save(user: Partial<User>) {
  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: user,
  });
}

async function remove(id: string) {
  await prisma.user.delete({
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
  save,
  remove,
};
