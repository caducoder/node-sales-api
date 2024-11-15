import {
  JWT_EXPIRATION,
  JWT_SECRET,
  REFRESH_EXPIRATION,
  REFRESH_SECRET,
} from "@shared/constants.js";
import CreateSessionsService from "../services/CreateSessionsService.js";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import ms from "ms";
import userService from "../services/userService.js";

async function Login(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;
  try {
    const { user, token, refreshToken } =
      await CreateSessionsService.CreateSessionsService({
        emailTxt: email,
        password,
      });

    return res
      .status(200)
      .cookie("refreshToken", refreshToken, {
        maxAge: ms(REFRESH_EXPIRATION),
        sameSite: "strict",
        httpOnly: true,
        secure: false,
        domain: req.hostname,
      })
      .send({ user, token });
  } catch (ex: unknown) {
    next(ex);
  }
}

async function Me(req: Request, res: Response, next: NextFunction) {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ error: "Refresh token não fornecido" });
  }

  try {
    const decoded = jwt.verify(refreshToken, REFRESH_SECRET as jwt.Secret);

    const userDb = await userService.ShowProfileService(decoded.id);

    const newAccessToken = jwt.sign(
      { id: userDb.id },
      JWT_SECRET as jwt.Secret,
      { expiresIn: JWT_EXPIRATION }
    );

    return res.status(200).json({ user: userDb, token: newAccessToken });
  } catch (error) {
    console.error(error);
    return res.status(403).json({ error: "Token inválido ou expirado" });
  }
}

async function RefreshToken(req: Request, res: Response, next: NextFunction) {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ error: "Refresh token não fornecido" });
  }

  try {
    // Verifica se o refresh token é válido
    const decoded = jwt.verify(refreshToken, REFRESH_SECRET as jwt.Secret);

    // Gera um novo token de acesso
    const newAccessToken = jwt.sign({ id: decoded.id }, JWT_SECRET as string, {
      expiresIn: JWT_EXPIRATION,
    });

    return res.status(200).json({ token: newAccessToken });
  } catch (error) {
    console.error(error);
    return res.status(403).json({ error: "Token inválido ou expirado" });
  }
}

export default {
  Login,
  Me,
  RefreshToken,
};
