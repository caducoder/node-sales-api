import userService from "../services/userService.js";
import { NextFunction, Request, Response } from "express";

async function ListUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const usersList = await userService.ListUserService();

    return res.json(usersList);
  } catch (ex: unknown) {
    next(ex);
  }
}

async function Createuser(req: Request, res: Response, next: NextFunction) {
  try {
    const createdUser = await userService.CreateUserService(req.body);

    return res.json(createdUser);
  } catch (ex: unknown) {
    next(ex);
  }
}

async function RemoveUser(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  try {
    await userService.RemoveUserService(id);

    return res.sendStatus(204);
  } catch (ex: unknown) {
    next(ex);
  }
}

export default {
  ListUsers,
  Createuser,
  RemoveUser,
};
