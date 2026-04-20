import groupsService from "@/services/groups.service";
import ErrorApi from "@/utils/errorApi";
import { createGroupSchema } from "@/utils/validations/group-validations";
import { NextFunction, Request, Response } from "express";

export class GropesController {
  static async createGroup(req:Request, res:Response, next:NextFunction) {
    try {
      const parseResult = createGroupSchema.safeParse(req.body);
      if(!parseResult.success) {
        const errorMessages = parseResult.error.issues.map(issue => 
          `${issue.path.join('.')}: ${issue.message}`
        ).toLocaleString();
        throw ErrorApi.BadRequest(errorMessages);
      }
      const newGroup = await groupsService.create({
        name: parseResult.data.name,
        description: parseResult.data?.description || '',
        creator: {
          connect: {
            id: req.user.id
          }
        },
        members: {
          create: [...parseResult.data.members?.map((item) => ({ userId: item}))|| [], { userId: req.user.id} ]
        }
      });
      return res.status(200).json(newGroup);
    } catch (error) {
      next(error);
    }
  }
} 