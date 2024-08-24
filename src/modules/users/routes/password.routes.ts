import PasswordController from "../controllers/PasswordController.js";
import { forgotPasswordSchema, resetPasswordSchema } from "../userSchema.js";
import { Router } from "express";
import { validateData } from "src/middleware/validationMiddleware.js";

const passwordRouter = Router();

passwordRouter.post(
  "/forgot",
  validateData(forgotPasswordSchema),
  PasswordController.Create
);

passwordRouter.post(
  "/reset",
  validateData(resetPasswordSchema),
  PasswordController.ResetPassword
);

export default passwordRouter;
