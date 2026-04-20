import { Prisma } from "@/generated/prisma/client";
import prisma from "@/utils/prisma-client";

class GroupsService {
  async create(data: Prisma.ChatGroupCreateInput) {
    return await prisma.chatGroup.create({
      data,
      include: {
        members: true
      }
    });
  }
  
}
export default new GroupsService();