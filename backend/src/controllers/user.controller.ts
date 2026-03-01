import { NextFunction, Request, Response } from "express";

export class UserController {
  static async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      
      res.status(200).json({});
    } catch (error) {
      next(error);
    }
  }
}