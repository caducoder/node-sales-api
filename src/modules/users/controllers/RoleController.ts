import RoleService from "../services/RoleService.js";
import { NextFunction, Request, Response } from "express";

async function ListAllRoles(req: Request, res: Response, next: NextFunction) {
  try {
    const roles = await RoleService.ListRoles();

    return res.json(roles);
  } catch (ex: unknown) {
    next(ex);
  }
}

async function RegisterNewRole(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { name } = req.body;

  try {
    const roleCreated = await RoleService.CreateNewRole(name);

    return res.json(roleCreated);
  } catch (ex: unknown) {
    next(ex);
  }
}

export default {
  ListAllRoles,
  RegisterNewRole,
};
