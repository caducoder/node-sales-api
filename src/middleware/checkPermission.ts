import { Request, Response, NextFunction } from "express";
import { prisma } from "@config/db.js";

export const checkPermission = (permissionName: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return res.status(403).json({
          error: "Não autorizado",
        });
      }

      const { id } = req.user;

      // Busca o usuário com suas permissões ativas
      const user = await prisma.user.findUnique({
        where: { id },
        include: {
          role: {
            include: {
              permissions: {
                where: {
                  isActive: true,
                },
                include: {
                  permission: true,
                },
              },
            },
          },
          module: true,
        },
      });

      if (!user) {
        return res.status(404).json({
          error: "Usuário não encontrado",
        });
      }

      // Se for superAdmin, permite tudo
      if (user.role.isSuperAdmin) {
        return next();
      }

      // Verifica se tem a permissão específica ativa
      const hasPermission = user.role.permissions.some((rolePermission) => {
        const permission = rolePermission.permission;

        // Verifica se é a permissão correta
        const isCorrectPermission = permission.action === permissionName;

        // Verifica se é uma permissão global (sem módulo) ou específica do módulo do usuário
        const hasModuleAccess =
          permission.moduleId === null || permission.moduleId === user.moduleId;

        return isCorrectPermission && hasModuleAccess;
      });

      if (!hasPermission) {
        return res.status(403).json({
          error: "Você não tem permissão para realizar esta ação",
        });
      }

      next();
    } catch (error) {
      console.error("Erro ao verificar permissões:", error);
      return res.status(500).json({
        error: "Erro ao verificar permissões",
      });
    }
  };
};

// Helper para combinar múltiplas permissões
export const checkPermissions = (permissionNames: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return res.status(403).json({
          error: "Não autorizado",
        });
      }

      const { id } = req.user;

      const user = await prisma.user.findUnique({
        where: { id },
        include: {
          role: {
            include: {
              permissions: {
                where: {
                  isActive: true,
                },
                include: {
                  permission: true,
                },
              },
            },
          },
          module: true,
        },
      });

      if (!user) {
        return res.status(404).json({
          error: "Usuário não encontrado",
        });
      }

      // Se for admin, permite tudo
      if (user.role.name === "admin") {
        return next();
      }

      // Verifica se tem todas as permissões necessárias
      const hasAllPermissions = permissionNames.every((permissionName) => {
        return user.role.permissions.some((rolePermission) => {
          const permission = rolePermission.permission;
          const isCorrectPermission = permission.action === permissionName;
          const hasModuleAccess =
            permission.moduleId === null ||
            permission.moduleId === user.moduleId;

          return isCorrectPermission && hasModuleAccess;
        });
      });

      if (!hasAllPermissions) {
        return res.status(403).json({
          error:
            "Você não tem todas as permissões necessárias para realizar esta ação",
        });
      }

      next();
    } catch (error) {
      console.error("Erro ao verificar permissões:", error);
      return res.status(500).json({
        error: "Erro ao verificar permissões",
      });
    }
  };
};
