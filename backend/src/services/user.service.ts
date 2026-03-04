import { Prisma } from "@/generated/prisma/client";
import prisma from "@/utils/prisma-client";

class UserService {
  async findOne(where: Prisma.UserWhereUniqueInput) {
    return await prisma.user.findUnique({ 
      where,
    });
  }
  async findAll(where?: Prisma.UserWhereInput) {
    return await prisma.user.findMany({
      where,
      omit: { password: true}
    });
  }
  async update(id: string, updates:Prisma.UserUpdateInput) {
    return await prisma.user.update({
      where: { id },
      data: updates,
    });
  }
}
export default new UserService();