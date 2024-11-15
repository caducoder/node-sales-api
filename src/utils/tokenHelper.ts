import {
  JWT_EXPIRATION,
  JWT_SECRET,
  REFRESH_EXPIRATION,
  REFRESH_SECRET,
} from "@shared/constants.js";
import jwt from "jsonwebtoken";

// Função para gerar tokens
export const generateToken = (user: { id: string; email: string }) => {
  const token = jwt.sign(
    { id: user.id, email: user.email },
    JWT_SECRET as string,
    {
      expiresIn: JWT_EXPIRATION,
    }
  );

  const refreshToken = jwt.sign({ id: user.id }, REFRESH_SECRET as string, {
    expiresIn: REFRESH_EXPIRATION,
  });

  return { token, refreshToken };
};
