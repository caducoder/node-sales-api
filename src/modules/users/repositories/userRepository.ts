import { prisma } from "@config/db.js";

async function create(dataNew: ICreateUserRequest) {
  const { role, moduleId, ...rest } = dataNew;
  const user = await prisma.user.create({
    data: {
      ...rest,
      role: {
        connectOrCreate: {
          where: {
            name: role || "collaborator",
          },
          create: {
            name: "collaborator",
          },
        },
      },
      ...(role !== "admin" && moduleId
        ? {
            module: {
              connect: {
                id: moduleId,
              },
            },
          }
        : {}),
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
    include: {
      role: {
        select: { name: true },
      },
    },
  });

  return user;
}

async function findByEmail(email: string) {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
    include: {
      role: true,
      module: true,
    },
  });

  return user;
}

async function findAll() {
  const users = await prisma.user.findMany({
    include: {
      role: true,
    },
  });

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

async function updateRole(id: string, roleId: string) {
  await prisma.user.update({
    where: {
      id,
    },
    data: {
      roleId: parseInt(roleId),
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
  updateRole,
};
