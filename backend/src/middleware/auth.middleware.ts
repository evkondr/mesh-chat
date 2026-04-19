import ErrorApi from "@/utils/errorApi";
import { NextFunction, Request, Response } from "express";
import prisma from "@/utils/prisma-client";
import tokenService from "@/services/token.service";

const authMiddleware = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      throw ErrorApi.Unauthorized();
    }
    const accessToken = authorizationHeader.split(' ')[1];

    if (!accessToken) {
      throw ErrorApi.Unauthorized();
    }
    const userData = await tokenService.validateAccessToken(accessToken);

    if (!userData) {
      throw ErrorApi.Unauthorized();
    }
    const user = await prisma.user.findFirst({
      where: {
        id: userData.userId
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