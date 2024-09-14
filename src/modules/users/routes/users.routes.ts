import userController from "../controllers/userController.js";
import { createUserSchema } from "../userSchema.js";
import { Router } from "express";
import isAuthenticated from "src/middleware/isAuthenticated.js";
import { validateData } from "src/middleware/validationMiddleware.js";

const userRouter = Router();

userRouter.use(isAuthenticated);

userRouter.get("/", userController.ListUsers);
userRouter.post("/", validateData(createUserSchema), userController.CreateUser);
userRouter.delete("/:id", userController.RemoveUser);

export default userRouter;
