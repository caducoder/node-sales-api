import ResetPasswordService from "../services/ResetPasswordService.js";
import SendForgotPasswordEmailService from "../services/SendForgotPasswordEmailService.js";
import userService from "../services/userService.js";
import { NextFunction, Request, Response } from "express";

async function Create(req: Request, res: Response, next: NextFunction) {
  const { email } = req.body;
  try {
    await SendForgotPasswordEmailService.sendForgotPasswordEmail(email);

    return res.sendStatus(204);
  } catch (ex: unknown) {
    next(ex);
  }
}

async function ResetPassword(req: Request, res: Response, next: NextFunction) {
  const { token, password } = req.body;
  try {
    await ResetPasswordService.resetPasswordService(password, token);

    return res.sendStatus(204);
  } catch (ex: unknown) {
    next(ex);
  }
}

export default {
  Create,
  ResetPassword,
};
