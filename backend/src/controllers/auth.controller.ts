import authService from "@/services/auth.service";
import userService from "@/services/user.service";
import ErrorApi from "@/utils/errorApi";
import { setTokenCookie } from "@/utils/setCookies";
import { loginSchema, signupSchema } from "@/utils/validations/auth-validations";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export class AuthController {
  static async signup(req:Request, res:Response, next:NextFunction) { 
    try {
      const parseResult = signupSchema.safeParse(req.body);
      if(!parseResult.success) {
        throw ErrorApi.BadRequest(parseResult.error.message);
      }
      const isExist = await userService.findOne({
        email: parseResult.data.email
      });
      if(isExist) {
        throw ErrorApi.BadRequest('User already exists');
      }
      const user = await authService.create(parseResult.data);
      const token = await jwt.sign({userID: user.id}, process.env['JWT_SECRET'] as string, { expiresIn: '7d'});
      setTokenCookie(res, token, 7 * 24 * 60 * 60 * 100);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }
  static async login(req:Request, res:Response, next:NextFunction) {
    try {
      const parseResult = loginSchema.safeParse(req.body);
      if(!parseResult.success) {
        throw ErrorApi.BadRequest(parseResult.error.message);
      }
      const user = await userService.findOne({
        email: parseResult.data.email
      });
      if(!user) {
        throw ErrorApi.NotFound('User not found');
      }
      const token = await jwt.sign({userID: user.id}, process.env['JWT_SECRET'] as string, { expiresIn: '7d'});
      setTokenCookie(res, token, 7 * 24 * 60 * 60 * 100);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
  static async logout(req:Request, res:Response) {
    res.send('logout');
  }
}
