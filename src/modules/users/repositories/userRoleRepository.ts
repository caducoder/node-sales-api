import { prisma } from "@config/db.js";

async function createRole(name: string) {
  const permissions = await prisma.permission.findMany();
  const role = await prisma.role.create({
    data: {
      name,
    },
  });

  await prisma.rolePermission.createMany({
    data: permissions.map((permission) => ({
      roleId: role.id,
      permissionId: permission.id,
    })),
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

interface IModulePermission {
  moduleId: number;
  moduleName: string;
  permissions: {
    action: string;
    isActive: boolean;
    description: string;
  }[];
}

async function getRolePermission(id: number) {
  const role = await prisma.role.findUnique({
    where: {
      id,
    },
    include: {
      permissions: {
        include: {
          permission: {
            include: {
              module: true,
            },
          },
        },
      },
    },
  });

  if (!role) {
    throw new Error("Role not found");
  }

  // console.log("Role permissions: ", JSON.stringify(role.permissions, null, 2));

  const permissionsPerModule = role.permissions.reduce(
    (acc: IModulePermission[], rolePermission) => {
      const { moduleId, module } = rolePermission.permission;
      const moduleName = module ? module.name : "general";

      let moduleEntry: any = acc.find((entry) => entry.moduleId === moduleId);

      if (!moduleEntry) {
        moduleEntry = {
          moduleId,
          moduleName,
          permissions: [],
        };
        acc.push(moduleEntry);
      }
      moduleEntry.permissions.push({
        action: rolePermission.permission.action,
        isActive: rolePermission.isActive,
        description: rolePermission.permission.description,
      });

      return acc;
    },
    []
  );

  // console.log(
  //   "Permissions per module: ",
  //   JSON.stringify(permissionsPerModule, null, 2)
  // );

  const formattedRole = {
    id: role.id,
    name: role.name,
    // permissions: role?.permissions.map((rp) => ({
    //   id: rp.permission.id,
    //   action: rp.permission.action,
    //   description: rp.permission.description,
    //   module: rp.permission.module
    //     ? {
    //         id: rp.permission.module.id,
    //         name: rp.permission.module.name,
    //       }
    //     : { id: null, name: "Todos" }, // Para permissões gerais (sem módulo)
    //   isActive: rp.isActive,
    // })),
    permissions: permissionsPerModule,
  };

  // console.log("Formatted role: ", JSON.stringify(formattedRole, null, 2));

  return formattedRole;
}

export default {
  createRole,
  findRoleByName,
  findAllRoles,
  getRolePermission,
};
