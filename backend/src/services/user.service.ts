import { Prisma } from "@/generated/prisma/client";
import prisma from "@/utils/prisma-client";

class UserService {
  async findOne(where: Prisma.UserWhereUniqueInput) {
    return await prisma.user.findUnique({ 
      where,
      omit: { password: true}
    });
  }
  async findAll() {
    return await prisma.user.findMany({
      omit: { password: true}
    });
  }
}
export default new UserService();