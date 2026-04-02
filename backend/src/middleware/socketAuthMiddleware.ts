import ErrorApi from "@/utils/errorApi";
import { ExtendedError, Socket } from "socket.io";
import jwt from "jsonwebtoken";
import prisma from "@/utils/prisma-client";

// eslint-disable-next-line no-unused-vars
const socketAuthMiddleware = async (socket:Socket, next: (err?: ExtendedError) => void) => {
  try{
    const token = socket.handshake.headers.cookie?.split("; ").find((row) => row.startsWith('jwt='))?.split('=')[1];
    if(!token) {
      return ErrorApi.Unauthorized();
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };

    const user = await prisma.user.findFirst({
      where: {
        id: decoded.userId
      }
    });
    if(!user) {
      return ErrorApi.NotFound('User not found');
    }
    socket.user = user;
    socket.userId = user.id;
    return next();
  } catch (error) {
    return next(error as ExtendedError);
  }
};
export default socketAuthMiddleware;