import userRepository from "../repositories/userRepository.js";
import userTokenRepository from "../repositories/userTokenRepository.js";
import createHttpError from "http-errors";

async function sendForgotPasswordEmail(email: string) {
  const user = await userRepository.findByEmail(email);

  if (!user) {
    throw createHttpError(404, "User not found");
  }

  const token = await userTokenRepository.generateToken(user.id);

  console.log("Token: " + token);
}

export default {
  sendForgotPasswordEmail,
};
