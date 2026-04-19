import ErrorApi from "@/utils/errorApi";
import { ExtendedError, Socket } from "socket.io";
import prisma from "@/utils/prisma-client";
import tokenService from "@/services/token.service";

// eslint-disable-next-line no-unused-vars
const socketAuthMiddleware = async (socket:Socket, next: (err?: ExtendedError) => void) => {
  try{
    
    //const token = socket.handshake.headers.cookie?.split("; ").find((row) => row.startsWith('token='))?.split('=')[1];
    const accessToken = socket.handshake.headers.authorization?.split(' ')[1];

    if(!accessToken) {
      return next(ErrorApi.Unauthorized());
    }
    const decoded = await tokenService.validateAccessToken(accessToken);
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