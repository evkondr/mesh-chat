import { Request, Response } from "express";

export class AuthController {
  static async login(req:Request, res:Response) {
    res.send('login');
  }
  static async signup(req:Request, res:Response) { 
    res.send('signup');
  }
  static async logout(req:Request, res:Response) {
    res.send('logout');
  }
}
