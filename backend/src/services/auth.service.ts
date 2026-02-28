import { Prisma } from "@/generated/prisma/client";
import prisma from "@/utils/prisma-client";
import bcrypt from "bcryptjs";

class AuthService {
  async create(data: Prisma.UserCreateInput) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return await prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
      omit: { password: true }
    });
  }
}
export default new AuthService();