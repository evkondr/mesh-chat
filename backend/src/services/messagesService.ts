import { Prisma } from "@/generated/prisma/client";
import prisma from "@/utils/prisma-client";

class MessagesService {
  async getMessages(where: Prisma.MessageWhereInput) {
    return await prisma.message.findMany({
      where
    });
  }
}
export default new MessagesService();