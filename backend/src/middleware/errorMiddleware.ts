import { NextFunction, Request, Response } from "express";

import ErrorApi from "@/utils/errorApi";
import { serverResponse } from "@/utils/constants";

const errorMiddleware = (err:unknown, req:Request, res:Response, next:NextFunction) => {
  if(err instanceof ErrorApi) {
    return res.status(err.status).json(serverResponse(err.message));
  }
  if(err instanceof Error) {
    return res.status(500).json(serverResponse(err.message));
  }
  next(err);
};

export default errorMiddleware;