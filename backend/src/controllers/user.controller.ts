import userService from "@/services/user.service";
import ErrorApi from "@/utils/errorApi";
import s3Client from "@/utils/s3-client";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";

export class UserController {
  static async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.files?.profilePic) {
        throw ErrorApi.BadRequest("Profile picture is required");
      }
      const file = req.files?.profilePic as UploadedFile;
      const fileName = req.user.id + '.' + file.name.split('.').at(-1);
      await s3Client.send(new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileName,
        Body: file.data
      }));
      const profilePic = `${process.env.AWS_ENDPOINT}/${process.env.AWS_BUCKET_NAME}/${fileName}`;
      const updatedUser = await userService.update(req.user.id, { profilePic });
      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  }
}