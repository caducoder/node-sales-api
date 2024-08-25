import userService from "../services/userService.js";
import { NextFunction, Request, Response } from "express";

async function ShowProfile(req: Request, res: Response, next: NextFunction) {
  try {
    const user_id = req.user.id;
    const userProfile = await userService.ShowProfileService(user_id);

    return res.json(userProfile);
  } catch (ex: unknown) {
    next(ex);
  }
}

async function UpdateProfile(req: Request, res: Response, next: NextFunction) {
  const { name, email, password, old_password } = req.body;
  try {
    await userService.UpdateUserService({
      user_id: req.user.id,
      name,
      email,
      password,
      old_password,
    });

    return res.sendStatus(204);
  } catch (ex: unknown) {
    next(ex);
  }
}

export default {
  ShowProfile,
  UpdateProfile,
};
