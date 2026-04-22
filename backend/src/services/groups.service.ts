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
  async finGroupByText(text: string) {
    return await prisma.chatGroup.findMany({
      where: {
        OR: [
          {
            name: {
              contains: text
            }
          },
          {
            description: {
              contains: text
            }
          }
        ]
      }
    });
  }
}
export default new GroupsService();