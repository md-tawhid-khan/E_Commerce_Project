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

  const adminHashedPassword = await bcrypt.hash("admin1234", 12);

  const admin = await prisma.user.create({
    data: {
      name: "Md Touhed Sorker",
      email: "md.tawhid.khan1998@gmail.com",
      password: adminHashedPassword,
      role: userRole.ADMIN,
    },
  });

  const userHashedPassword = await bcrypt.hash("user1234", 12);

  await prisma.user.create({
    data:{
      name: "Md Touhed Sorker",
      email: "userExample@gmail.com",
      password: userHashedPassword,
      role: userRole.USER,
    }
  })

  await prisma.product.createMany({
    data: [
      {
        name: "Mobile Model A",
        sku: "mobile100001",
        description: "This is a high-quality mobile device Model A",
        price: 21000,
        stock: 25,
        status: "ACTIVE",
      },
      {
        name: "Mobile Model B",
        sku: "mobile100002",
        description: "This is a high-quality mobile device Model B",
        price: 22000,
        stock: 30,
        status: "ACTIVE",
      },
       {
        name: "Mobile Model C",
        sku: "mobile100003",
        description: "This is a high-quality mobile device Model C",
        price: 25000,
        stock: 20,
        status: "ACTIVE",
      },
      {
        name: "Mobile Model D",
        sku: "mobile100004",
        description: "This is a high-quality mobile device Model D",
        price: 27000,
        stock: 15,
        status: "ACTIVE",
      },
    ],
     skipDuplicates: true, 
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
