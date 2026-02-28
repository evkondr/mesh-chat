import { Response } from "express";

export const setTokenCookie = (res: Response, token: string, maxAge: number) => {
  res.cookie('token', token, {
    maxAge,
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
  });
};