import { Prisma } from "@/generated/prisma/client";
import ErrorApi from "@/utils/errorApi";
import prisma from "@/utils/prisma-client";
import tokenService from "./token.service";

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
  async refreshToken(refreshToken: string) {
    if (!refreshToken) {
      throw ErrorApi.Unauthorized();
    }
    const userData = await tokenService.validateRefreshToken(refreshToken);
    const savedToken = await prisma.token.findFirst({
      where: {
        refreshToken
      }
    });
    if (!savedToken || !userData) {
      throw ErrorApi.Unauthorized();
    }
    const newTokens = await tokenService.generateToken(userData);
    const user = await prisma.user.findFirst({
      where: {
        id: userData.userId
      }
    });
    return {
      ...user,
      ...newTokens
    };
  }
}
export default new UserService();