import userService from "@/services/user.service";
import { NextFunction, Request, Response } from "express";

export class MessageController {
  static async getAllContacts(req: Request, res: Response, next:NextFunction) {
    try {
      const loggedInUser = req.user.id;
      const contacts = await userService.findAll({
       id: {
        not: loggedInUser
       }
      });
      res.status(200).json(contacts);
    } catch (error) {
      next(error);
    }
  }
  static async getAllChats(req: Request, res: Response, next:NextFunction) {
    try {
      res.status(200).json({});
    } catch (error) {
      next(error);
    }
  }
  static async getMessagesByUserId(req: Request, res: Response, next:NextFunction) {
    try {
      res.status(200).json({});
    } catch (error) {
      next(error);
    }
  }
  static async sendMessage(req: Request, res: Response, next:NextFunction) {
    try {
      res.status(200).json({});
    } catch (error) {
      next(error);
    }
  }
}