import { Prisma } from "@/generated/prisma/client";
import prisma from "@/utils/prisma-client";

class MessagesService {
  async getMessages(where: Prisma.MessageWhereInput) {
    return await prisma.message.findMany({
      where
    });
  }
  async createMessage(data: Prisma.MessageCreateInput) {
    return await prisma.message.create({
      data,
    });
  }
}
export default new MessagesService();