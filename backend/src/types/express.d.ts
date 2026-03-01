import { Prisma__UserClient } from "@/generated/prisma/models";

declare global {
  namespace Express {
    interface Request {
      user?: Prisma__UserClient
    }
  }
}