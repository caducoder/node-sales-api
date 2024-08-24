import { prisma } from "@config/db.js";

async function findByToken(token: string) {
  const userToken = await prisma.userToken.findFirst({
    where: {
      token,
    },
  });

  return userToken;
}

async function generateToken(user_id: string) {
  const userToken = await prisma.userToken.create({
    data: {
      user_id,
    },
  });

  return userToken;
}

async function removeToken(id: string) {
  await prisma.userToken.delete({
    where: {
      id,
    },
  });
}

export default {
  findByToken,
  generateToken,
  removeToken,
};
