import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET;

export default function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  // console.log("[AUTH HEADER]", authHeader);
  if (!authHeader) {
    console.log("No token provided");
    throw createHttpError(403, "No token provided");
  }

  const [, token] = authHeader.split(" ");

  try {
    const decodedToken = jwt.verify(token, SECRET_KEY as string);

    const { id, role, email } = decodedToken as {
      id: string;
      role: string;
      email: string;
    };
    const user = { id, role, email };
    req.user = user;

    return next();
  } catch (error) {
    throw createHttpError(401, "Invalid token");
  }
}
