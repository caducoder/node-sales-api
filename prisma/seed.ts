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

  const adminRole = await prisma.role.create({
    data: { name: "admin", isSuperAdmin: true },
  });

  // Criar módulos
  const modules = await Promise.all([
    prisma.module.create({ data: { name: "financial" } }),
    prisma.module.create({ data: { name: "academic" } }),
    prisma.module.create({ data: { name: "sales" } }),
    prisma.module.create({ data: { name: "inventory" } }),
  ]);

  const createModulePermissions = async (
    moduleId: number,
    moduleName: string
  ) => {
    const actionVerbs = ["create", "read", "update", "delete"];
    const permissions = [];

    for (const action of actionVerbs) {
      const permission = await prisma.permission.create({
        data: {
          action: `${action}`,
          description: `Permite ${action} no módulo ${moduleName}`,
          moduleId,
        },
      });
      permissions.push(permission);
    }

    return permissions;
  };

  // Criar permissões gerais (sem módulo específico)
  const generalPermissions = await Promise.all([
    prisma.permission.create({
      data: {
        action: "access_dashboard",
        description: "Permite acesso ao dashboard",
      },
    }),
    prisma.permission.create({
      data: {
        action: "generate_reports",
        description: "Permite gerar relatórios",
      },
    }),
    prisma.permission.create({
      data: {
        action: "send_notifications",
        description: "Permite criar notificações",
      },
    }),
  ]);

  // Criar permissões para cada módulo
  const modulePermissions = await Promise.all(
    modules.map((module) => createModulePermissions(module.id, module.name))
  );

  // Flatten array de permissões
  const allPermissions = [...generalPermissions, ...modulePermissions.flat()];

  // Configurar permissões por role
  const rolePermissionsData = [];

  // Admin tem todas as permissões ativas
  for (const permission of allPermissions) {
    rolePermissionsData.push({
      roleId: adminRole.id, // admin
      permissionId: permission.id,
      isActive: true,
    });
  }

  // Criar todas as relações de role-permission
  await prisma.rolePermission.createMany({
    data: rolePermissionsData,
  });

  const hashedPassword = await hash(defaultAdminPassword, 10);

  await prisma.user.create({
    data: {
      name: defaultAdminUser,
      email: defaultAdminEmail,
      password: hashedPassword,
      roleId: adminRole.id, // admin
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
