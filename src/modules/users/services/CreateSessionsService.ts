import userRepository from "../repositories/userRepository.js";
import bcrypt from "bcrypt";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import { generateToken } from "src/utils/tokenHelper.js";

interface IRequest {
  emailTxt: string;
  password: string;
}
async function CreateSessionsService({ emailTxt, password }: IRequest) {
  const userDb = await userRepository.findByEmail(emailTxt);

  if (!userDb) {
    throw createHttpError(401, "Incorrect email or password");
  }

  const isPwdEqual = await bcrypt.compare(password, userDb.password);

  if (!isPwdEqual) {
    throw createHttpError(401, "Incorrect email or password");
  }

  const { token, refreshToken } = generateToken(userDb);

  const { role, id, created_at, name, email, module, ...rest } = userDb;

  return {
    user: { id, name, module, role: role.name, email, created_at },
    token,
    refreshToken,
  };
}

export default {
  CreateSessionsService,
};
