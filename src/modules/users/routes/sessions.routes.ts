import sessionsController from "../controllers/SessionsController.js";
import { createUserSchema } from "../userSchema.js";
import { Router } from "express";
import { validateData } from "src/middleware/validationMiddleware.js";

const sessionsRouter = Router();

sessionsRouter.post("/", sessionsController.Login);

export default sessionsRouter;
