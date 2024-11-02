import userRepository from "../repositories/userRepository.js";
import bcrypt from "bcrypt";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";

interface IRequest {
  email: string;
  password: string;
}
async function CreateSessionsService({ email, password }: IRequest) {
  const userDb = await userRepository.findByEmail(email);

  if (!userDb) {
    throw createHttpError(401, "Incorrect email or password");
  }

  const isPwdEqual = await bcrypt.compare(password, userDb.password);

  if (!isPwdEqual) {
    throw createHttpError(401, "Incorrect email or password");
  }

  const token = jwt.sign(
    {
      userId: userDb.id,
      role: userDb.role.name,
    },
    process.env.JWT_SECRET as string,
    {
      subject: userDb.id,
      expiresIn: "1d",
    }
  );

  const { role, id, moduleId, created_at, name, ...rest } = userDb;

  return { user: { id, name, moduleId, role: role.name, created_at }, token };
}

export default {
  CreateSessionsService,
};
