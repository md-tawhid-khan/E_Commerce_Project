import bcrypt from "bcrypt";

import { userRole } from "../generated/prisma/enums";
import { prisma } from "../src/lib/prisma";




const seedAdmin = async () => {
  const isAdminExist = await prisma.user.findFirst({
    where: { role: userRole.ADMIN },
  });

  if (isAdminExist) {
    console.log("admin already exists");
    return;
  }

  const hashedPassword = await bcrypt.hash("admin1234", 12);

  const admin = await prisma.user.create({
    data: {
      name: "Md Touhed Sorker",
      email: "md.tawhid.khan1998@gmail.com",
      password: hashedPassword,
      role: userRole.ADMIN,
    },
  });

  console.log(" admin created successfully:", admin);
};

seedAdmin()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
