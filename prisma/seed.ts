import { prisma } from "@config/db.js";
import { hash } from "bcrypt";

async function seed() {
  await prisma.user.create({
    data: {
      name: "Cadu Maverick",
      email: "cadudrop@example.com",
      password: await hash("adminPwd", 8),
      role: {
        create: {
          name: "admin",
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
