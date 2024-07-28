import userRepository from "../repositories/userRepository.js";
import bcrypt from "bcrypt";
import createHttpError from "http-errors";

async function CreateUserService(data: ICreateUserRequest) {
  const emailExists = await userRepository.findByEmail(
    data.email.toLowerCase()
  );

  if (emailExists) {
    throw createHttpError(404, "Email already exists");
  }

  const hashedPassword = await bcrypt.hash(data.password, 8);

  const user = await userRepository.create({
    ...data,
    password: hashedPassword,
  });

  return user;
}

async function ListUserService() {
  const usersList = await userRepository.findAll();

  return usersList;
}

async function RemoveUserService(id: string) {
  await userRepository.remove(id);
}

export default {
  CreateUserService,
  ListUserService,
  RemoveUserService,
};
