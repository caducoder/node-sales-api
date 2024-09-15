import { prisma } from "@config/db.js";
import { hash } from "bcrypt";

async function seed() {
  await prisma.role.createMany({
    data: [
      {
        name: "admin",
      },
      {
        name: "visitor",
      },
      {
        name: "moderator",
      },
      {
        name: "authenticated",
      },
    ],
  });

  await prisma.user.create({
    data: {
      name: "Cadu Maverick",
      email: "cadudrop@example.com",
      password: await hash("adminPwd", 8),
      role: {
        connectOrCreate: {
          where: {
            name: "admin",
          },
          create: {
            name: "admin",
          },
        },
      },
    },
  });
}
seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
