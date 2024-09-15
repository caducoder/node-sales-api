import userRoleRepository from "../repositories/userRoleRepository.js";

async function CreateNewRole(roleName: string) {
  const newRole = await userRoleRepository.createRole(roleName);
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
