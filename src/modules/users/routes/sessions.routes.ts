import sessionsController from "../controllers/SessionsController.js";
import { Router } from "express";
import userController from "../controllers/userController.js";
import { validateData } from "src/middleware/validationMiddleware.js";
import { createUserSchema } from "../userSchema.js";

const sessionsRouter = Router();

sessionsRouter.post("/", sessionsController.Login);
sessionsRouter.get("/me", sessionsController.Me);
sessionsRouter.post(
  "/register",
  validateData(createUserSchema),
  userController.CreateUser
);

sessionsRouter.get("/refresh", sessionsController.RefreshToken);

export default sessionsRouter;
