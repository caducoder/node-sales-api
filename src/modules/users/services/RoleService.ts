import userRepository from "../repositories/userRepository.js";
import userRoleRepository from "../repositories/userRoleRepository.js";
import createHttpError from "http-errors";

async function CreateNewRole(roleName: string) {
  if (roleName.length < 3) {
    throw createHttpError(400, "Role name must be at least 3 characters long");
  }

  const newRole = await userRoleRepository.createRole(
    roleName.toLocaleLowerCase()
  );
  return newRole;
}

async function ListRoles() {
  const roles = await userRoleRepository.findAllRoles();
  return roles;
}

async function ChangeUserRole(userId: string, roleId: string) {
  const role = await userRoleRepository.findRoleByName(roleId);
  const user = await userRepository.findById(userId);

  if (!user) {
    throw createHttpError(404, "User not found");
  }

  if (!role) {
    throw createHttpError(404, "Role not found");
  }

  if (user.roleId === role.id) {
    return;
  }

  await userRepository.updateRole(userId, roleId);

  return;
}

async function getRolePermissions(roleId: number) {
  const role = await userRoleRepository.getRolePermission(roleId);
  if (!role) {
    throw createHttpError(404, "Role not found");
  }
  return role;
}

export default {
  CreateNewRole,
  ListRoles,
  ChangeUserRole,
  getRolePermissions,
};
