import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";

export const roleAuthorize = (...role: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user.role;

    if (!role.includes(userRole)) {
      throw createHttpError(
        403,
        "Your roles are not allowed to access this route"
      );
    }

    next();
  };
};
