import CreateSessionsService from "../services/CreateSessionsService.js";
import { NextFunction, Request, Response } from "express";

async function Login(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;
  try {
    const user = await CreateSessionsService.CreateSessionsService({
      email,
      password,
    });

    return res.json(user);
  } catch (ex: unknown) {
    next(ex);
  }
}

export default {
  Login,
};
