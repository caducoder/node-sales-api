import roles from "./roles.js";
import { AbilityBuilder } from "@casl/ability";
import { createPrismaAbility } from "@casl/prisma";

function defineAbilitiesFor(user: { id: string; role: string }) {
  const { can, cannot, build } = new AbilityBuilder(createPrismaAbility);

  if (user.role === roles.admin) {
    can("manage", "all"); // Admin pode gerenciar tudo
  } else if (user.role === roles.authenticated) {
    can("read", "Product"); // Usuários comuns podem ler Products
    can("update", "Product"); // Pode atualizar Products
    cannot("delete", "Product"); // Não pode deletar Products
  } else if (user.role === roles.moderator) {
    can("read", "Product");
    can("delete", "Product"); // Moderadores podem deletar
    can("create", "Product");
  } else {
    can("read", "Product"); // Visitantes podem ler posts
  }

  return build();
}

export default defineAbilitiesFor;
