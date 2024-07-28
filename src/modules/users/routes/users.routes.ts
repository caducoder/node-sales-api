import userController from "../controllers/userController.js";
import { createUserSchema } from "../userSchema.js";
import { Router } from "express";
import isAuthenticated from "src/middleware/isAuthenticated.js";
import { validateData } from "src/middleware/validationMiddleware.js";

const userRouter = Router();

userRouter.get("/", isAuthenticated, userController.ListUsers);
userRouter.post("/", validateData(createUserSchema), userController.Createuser);
userRouter.delete("/:id", userController.RemoveUser);

export default userRouter;
