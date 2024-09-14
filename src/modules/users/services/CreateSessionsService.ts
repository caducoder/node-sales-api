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
      role: userDb.role.name,
    },
    process.env.JWT_SECRET as string,
    {
      subject: userDb.id,
      expiresIn: "1d",
    }
  );

  const { password: passw, roleId, ...userDTO } = userDb;

  return { user: { ...userDTO, role: userDb.role.name }, token };
}

export default {
  CreateSessionsService,
};
