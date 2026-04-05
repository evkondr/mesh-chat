import ErrorApi from "@/utils/errorApi";
import { ExtendedError, Socket } from "socket.io";
import jwt from "jsonwebtoken";
import prisma from "@/utils/prisma-client";

// eslint-disable-next-line no-unused-vars
const socketAuthMiddleware = async (socket:Socket, next: (err?: ExtendedError) => void) => {
  try{
    
    const token = socket.handshake.headers.cookie?.split("; ").find((row) => row.startsWith('token='))?.split('=')[1];
    if(!token) {
      return next(ErrorApi.Unauthorized());
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };
    if (!decoded) {
      console.log("Socket connection rejected: Invalid token");
      return next(ErrorApi.Unauthorized());
    }
    
    const user = await prisma.user.findFirst({
      where: {
        id: decoded.userId
      }
    });
    if(!user) {
      return next(ErrorApi.NotFound('User not found'));
    }
    socket.user = user;
    socket.userId = user.id;
    next();
  } catch (error) {
    next(error as ExtendedError);
  }
};
export default socketAuthMiddleware;