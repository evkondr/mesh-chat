import { Prisma } from "@/generated/prisma/client";
import prisma from "@/utils/prisma-client";

class UserService {
  async findOne(where: Prisma.UserWhereUniqueInput) {
    return await prisma.user.findUnique({ where });
  }
  async findAll() {
    return await prisma.user.findMany();
  }
  async create(data: Prisma.UserCreateInput) {
    return await prisma.user.create({
      data
    });
  }
}
export default new UserService();