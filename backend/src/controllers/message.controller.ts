import messagesService from "@/services/messagesService";
import userService from "@/services/user.service";
import ErrorApi from "@/utils/errorApi";
import s3Client from "@/utils/s3-client";
import { PutObjectCommand } from "@aws-sdk/client-s3";
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
      const loggedInUserId = req.user.id;
      const messages = await messagesService.getMessages({
        where: {
          OR: [
            {
              senderId: loggedInUserId
            },
            {
              receiverId: loggedInUserId
            }
          ]
        }
      });
      const chatIds = [...new Set(messages.map((msg) => msg.senderId === loggedInUserId ? msg.receiverId : msg.senderId))];
      const chatUsers = await userService.findAll({
        id: {
          in: chatIds
        }
      });
      res.status(200).json(chatUsers);
    } catch (error) {
      next(error);
    }
  }
  static async getMessagesByUserId(req: Request, res: Response, next:NextFunction) {
    try {
      const loggedInUserId = req.user.id;
      const { id:receiverId } = req.params as { id: string};
      const user = await userService.findOne({
        where: {
          id:receiverId
        }
      });
      if(!user) {
        throw ErrorApi.NotFound('User not found');
      }
      const messages = await messagesService.getMessages({
        where: {
          OR: [
             {
              receiverId: receiverId
            },
            {
              senderId: loggedInUserId
            }
          ]
        }
      });
      res.status(200).json(messages);
    } catch (error) {
      next(error);
    }
  }
  static async sendMessage(req: Request, res: Response, next:NextFunction) {
    try {
      const senderId = req.user.id;
      const {id:receiverId} = req.params as { id: string};
      const user = await userService.findOne({
        where: {
          id:receiverId
        }
      });
      if(!user) {
        throw ErrorApi.NotFound('User not found');
      }
      const { text } = req.body;
      let imageUrl = '';
      if(req.files?.image) {
        const file = req.files?.image;
        if(!Array.isArray(file)){
          const fileName = req.user.id + '.' + file.name.split('.').at(-1);
          await s3Client.send(new PutObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: fileName,
            Body: file.data
          }));
          imageUrl = `${process.env.AWS_ENDPOINT}/${process.env.AWS_BUCKET_NAME}/${fileName}`; 
        }
      }
      const message = await messagesService.createMessage({
        receiver: {
          connect: { id: receiverId}
        },
        sender: {
          connect: {
            id: senderId
          }
        },
        text,
        image: imageUrl
      });
      res.status(200).json(message);
    } catch (error) {
      next(error);
    }
  }
}