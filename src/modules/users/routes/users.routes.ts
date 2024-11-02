import { checkPermission } from "src/middleware/checkPermission.js";
import RoleController from "../controllers/RoleController.js";
import userController from "../controllers/userController.js";
import { createUserSchema } from "../userSchema.js";
import { Router } from "express";
import isAuthenticated from "src/middleware/isAuthenticated.js";
import { validateData } from "src/middleware/validationMiddleware.js";

const userRouter = Router();

userRouter.use(isAuthenticated);

userRouter.get("/", userController.ListUsers);

userRouter.delete("/:id", checkPermission("delete"), userController.RemoveUser);

userRouter.get("/roles", RoleController.ListAllRoles);
userRouter.post("/roles", RoleController.RegisterNewRole);
userRouter.post("/roles/assign", RoleController.AssignRoleToUser);

export default userRouter;
