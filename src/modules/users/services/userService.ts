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

async function ShowProfileService(id: string) {
  const user = await userRepository.findById(id);

  if (!user) {
    throw createHttpError(404, "User not found.");
  }

  const { password, roleId, ...userDTO } = user;

  return { ...userDTO, role: user.role.name };
}

async function UpdateUserService({
  user_id,
  email,
  name,
  password,
  old_password,
}: IUpdateUserRequest) {
  const user = await userRepository.findById(user_id);

  if (!user) {
    throw createHttpError(404, "User not found.");
  }

  if (email) {
    const userUpdateEmail = await userRepository.findByEmail(email);
    if (userUpdateEmail && userUpdateEmail.id !== user_id) {
      throw createHttpError(404, "Email already used.");
    }
    user.email = email;
  }

  if (password && !old_password) {
    throw createHttpError(404, "Old password not informed.");
  }

  if (password && old_password) {
    const checkOldPassword = await bcrypt.compare(old_password, user.password);
    if (!checkOldPassword) {
      throw createHttpError(404, "Old password does not match.");
    }

    user.password = await bcrypt.hash(password, 8);
  }

  if (name) user.name = name;

  await userRepository.save(user);
}

async function RemoveUserService(id: string) {
  await userRepository.remove(id);
}

export default {
  CreateUserService,
  ListUserService,
  ShowProfileService,
  UpdateUserService,
  RemoveUserService,
};
