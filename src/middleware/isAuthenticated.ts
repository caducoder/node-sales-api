import defineAbilitiesFor from "@shared/RBAC/permissions.js";
import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";

export default function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw createHttpError(403, "No token provided");
  }

  const [, token] = authHeader.split(" ");

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);

    const { sub, role } = decodedToken as { sub: string; role: string };
    const user = { id: sub, role };
    console.log("[USER]", user);
    req.user = user;
    // req.ability = defineAbilitiesFor(user);
    return next();
  } catch (error) {
    throw createHttpError(401, "Invalid token");
  }
}
