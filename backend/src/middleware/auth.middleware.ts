import ErrorApi from "@/utils/errorApi";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import prisma from "@/utils/prisma-client";

const authMiddleware = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      throw ErrorApi.Unauthorized();
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };
    if (!decoded) {
      throw ErrorApi.Unauthorized();
    }
    const user = await prisma.user.findFirst({
      where: {
        id: decoded.userId
      },
      omit: {
        password: true
      }
    });
    if(!user) {
      throw ErrorApi.NotFound('User not found');
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
export default authMiddleware;