import { Request, Response, NextFunction } from "express";
import { prisma } from "@config/db.js";

export const checkPermission = (action: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    console.log("[REQ USER]", req?.user);
    console.log("[ACTION]", action);
    try {
      if (!req.user) {
        return res.status(403).send({ error: "Não autorizado" });
      }

      const { id } = req.user;

      // Busca o usuário com suas relações
      const user = await prisma.user.findUnique({
        where: { id },
        include: {
          role: {
            include: {
              permissions: true,
            },
          },
          module: true,
        },
      });

      if (!user) {
        return res.status(404).send({ error: "Usuário não encontrado" });
      }

      // Se for admin, permite tudo
      if (user.role.name === "admin") {
        return next();
      }

      // Verifica se tem permissão para a ação no módulo específico
      const hasPermission = user.role.permissions.some(
        (permission) =>
          permission.action === action &&
          (permission.moduleId === null || // permissão global
            permission.moduleId === user.moduleId) // permissão específica do módulo
      );

      if (!hasPermission) {
        return res.status(403).send({
          error: "Você não tem permissão para realizar esta ação.",
        });
      }

      next();
    } catch (error) {
      res.status(500).send({ error: "Erro ao verificar permissões" });
    }
  };
};
