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

export default {
  CreateNewRole,
  ListRoles,
};
