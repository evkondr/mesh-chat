import { Prisma } from "@/generated/prisma/client";
import prisma from "@/utils/prisma-client";

class UserService {
  async findOne(args:{where: Prisma.UserWhereUniqueInput, include?: Prisma.UserInclude}) {
    return await prisma.user.findUnique({ 
      where: args.where,
      include: args.include,
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