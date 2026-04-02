import { Prisma } from "@/generated/prisma/client";

// Extend the Socket interface within the 'socket.io' module
declare module 'socket.io' {
  interface Socket {
    user?: Prisma.UserGetPayload
    userId?: string
  }
}