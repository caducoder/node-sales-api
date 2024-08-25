import ProfileController from "../controllers/ProfileController.js";
import { updateUserSchema } from "../userSchema.js";
import { Router } from "express";
import isAuthenticated from "src/middleware/isAuthenticated.js";
import { validateData } from "src/middleware/validationMiddleware.js";

const profileRouter = Router();

profileRouter.use(isAuthenticated);

profileRouter.get("/", ProfileController.ShowProfile);
profileRouter.put(
  "/",
  validateData(updateUserSchema),
  ProfileController.UpdateProfile
);

export default profileRouter;
