import { prisma } from "@config/db.js";
import { hash } from "bcrypt";

async function seed() {
  const defaultAdminUser = process.env.DEFAULT_ADMIN_USER || "admin";
  const defaultAdminEmail =
    process.env.DEFAULT_ADMIN_EMAIL || "admin@gmail.com";
  const defaultAdminPassword = process.env.DEFAULT_ADMIN_PASSWORD;

  if (!defaultAdminPassword) {
    throw new Error(
      "DEFAULT_ADMIN_PASSWORD deve ser definida nas variáveis de ambiente"
    );
  }

  const admin = await prisma.role.create({
    data: { name: "admin" },
  });

  const coordinator = await prisma.role.create({
    data: { name: "coordinator" },
  });

  const collaborator = await prisma.role.create({
    data: { name: "collaborator" },
  });

  // Criar módulos
  const modules = await Promise.all([
    prisma.module.create({ data: { name: "financial" } }),
    prisma.module.create({ data: { name: "academic" } }),
    prisma.module.create({ data: { name: "sales" } }),
    prisma.module.create({ data: { name: "inventory" } }),
  ]);

  // Criar permissões para admin (acesso total)
  await prisma.permission.createMany({
    data: ["create", "read", "update", "delete"].map((action) => ({
      action,
      roleId: admin.id,
      moduleId: null, // null significa todos os módulos
    })),
  });

  // Criar permissões para coordinator (acesso total ao seu módulo)
  for (const module of modules) {
    await prisma.permission.createMany({
      data: ["create", "read", "update", "delete"].map((action) => ({
        action,
        roleId: coordinator.id,
        moduleId: module.id,
      })),
    });
  }

  // Criar permissões para collaborator (acesso limitado ao seu módulo)
  for (const module of modules) {
    await prisma.permission.createMany({
      data: ["read", "create"].map((action) => ({
        action,
        roleId: collaborator.id,
        moduleId: module.id,
      })),
    });
  }

  const hashedPassword = await hash(defaultAdminPassword, 10);

  await prisma.user.create({
    data: {
      name: defaultAdminUser,
      email: defaultAdminEmail,
      password: hashedPassword,
      roleId: admin.id,
      // Note que não definimos moduleId para o admin
    },
  });
}
seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
