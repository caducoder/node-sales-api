import userRepository from "../repositories/userRepository.js";
import userTokenRepository from "../repositories/userTokenRepository.js";
import { hash } from "bcrypt";
import { addHours, isAfter } from "date-fns";
import createHttpError from "http-errors";

async function resetPasswordService(password: string, token: string) {
  const userToken = await userTokenRepository.findByToken(token);

  if (!userToken) {
    throw createHttpError(404, "User token does not exists.");
  }

  const user = await userRepository.findById(userToken.id);

  if (!user) {
    throw createHttpError(404, "User not found.");
  }

  const tokenCreatedAt = userToken.created_at;
  const compareDate = addHours(tokenCreatedAt, 2);

  if (isAfter(Date.now(), compareDate)) {
    throw createHttpError(401, "Token expired.");
  }

  user.password = await hash(password, 8);

  await userRepository.save(user);
}

export default {
  resetPasswordService,
};
