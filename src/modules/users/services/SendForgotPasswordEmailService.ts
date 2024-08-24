import userRepository from "../repositories/userRepository.js";
import userTokenRepository from "../repositories/userTokenRepository.js";
import EtherealMail from "@config/mail/EtherealMail.js";
import createHttpError from "http-errors";

async function sendForgotPasswordEmail(email: string) {
  const user = await userRepository.findByEmail(email);

  if (!user) {
    throw createHttpError(404, "User not found");
  }

  try {
    const { token } = await userTokenRepository.generateToken(user.id);

    // console.log("Token: " + JSON.stringify(token));
    await EtherealMail.sendMail({
      to: email,
      subject: "Redefinição de senha",
      templateData: {
        template: "reset_password",
        variables: {
          name: user.name,
          link: `http://localhost:3000/reset_password?token=${token}`,
        },
      },
    });
  } catch (error) {
    console.log("Error: " + error);
  }
}

export default {
  sendForgotPasswordEmail,
};
