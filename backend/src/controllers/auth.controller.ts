import authService from "@/services/auth.service";
import userService from "@/services/user.service";
import ErrorApi from "@/utils/errorApi";
import { signupSchema } from "@/utils/validations/auth-validations";
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
      res.cookie('token', token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: 'strict',
      });
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }
  static async login(req:Request, res:Response) {
    
    res.send('login');
  }
  static async logout(req:Request, res:Response) {
    res.send('logout');
  }
}
