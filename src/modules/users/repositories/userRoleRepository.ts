import { prisma } from "@config/db.js";

async function createRole(name: string) {
  const role = await prisma.role.create({
    data: {
      name,
    },
  });
  return role;
}

async function findRoleByName(name: string) {
  const role = await prisma.role.findFirst({
    where: {
      name,
    },
  });
  return role;
}

async function findAllRoles() {
  const roles = await prisma.role.findMany();
  return roles;
}

export default {
  createRole,
  findRoleByName,
  findAllRoles,
};
