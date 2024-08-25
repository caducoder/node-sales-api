import sessionsController from "../controllers/SessionsController.js";
import { Router } from "express";

const sessionsRouter = Router();

sessionsRouter.post("/", sessionsController.Login);

export default sessionsRouter;
