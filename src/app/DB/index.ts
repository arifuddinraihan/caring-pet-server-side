import * as bcrypt from "bcrypt";
import prisma from "../shared/prisma";
import { UserRole } from "@prisma/client";
import config from "../config";

const seedSuperAdmin = async () => {
  try {
    const isExistSuperAdmin = await prisma.user.findFirst({
      where: {
        role: UserRole.SUPER_ADMIN,
      },
    });

    if (isExistSuperAdmin) {
      console.log("Super admin already exists!");
      return;
    }

    const hashedPassword = await bcrypt.hash(config.superAdmin.password!, 12);

    const superAdminData = await prisma.user.create({
      data: {
        name: "Super Admin",
        email: config.superAdmin.email!,
        password: hashedPassword,
        profilePhoto: config.superAdmin.image!,
        role: UserRole.SUPER_ADMIN,
        admin: {
          create: {
            name: "Super Admin",
          },
        },
      },
    });

    console.log("Super Admin Created Successfully!", superAdminData);
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
};

export default seedSuperAdmin;
