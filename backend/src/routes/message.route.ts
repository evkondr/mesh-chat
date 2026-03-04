import { MessageController } from "@/controllers/message.controller";
import authMiddleware from "@/middleware/auth.middleware";
import { Router } from "express";


const messageRouter = Router();

messageRouter.get('/contacts', authMiddleware, MessageController.getAllContacts);
messageRouter.get('/chats', authMiddleware, MessageController.getAllChats);
messageRouter.get('/:id', authMiddleware, MessageController.getMessagesByUserId);

messageRouter.post('/send/:id', authMiddleware, MessageController.sendMessage);

export default messageRouter;