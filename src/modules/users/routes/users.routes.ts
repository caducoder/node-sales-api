import { checkPermission } from "src/middleware/checkPermission.js";
import RoleController from "../controllers/RoleController.js";
import userController from "../controllers/userController.js";
import { createUserSchema } from "../userSchema.js";
import { Router } from "express";
import isAuthenticated from "src/middleware/isAuthenticated.js";
import { validateData } from "src/middleware/validationMiddleware.js";

const userRouter = Router();

userRouter.use(isAuthenticated);

userRouter.get("/", checkPermission("read"), userController.ListUsers);

userRouter.delete("/:id", checkPermission("delete"), userController.RemoveUser);

userRouter.get("/roles", checkPermission("read"), RoleController.ListAllRoles);
userRouter.post(
  "/roles",
  checkPermission("create"),
  RoleController.RegisterNewRole
);
userRouter.post(
  "/roles/assign",
  checkPermission("update"),
  RoleController.AssignRoleToUser
);

export default userRouter;
