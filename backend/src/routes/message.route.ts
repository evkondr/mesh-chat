import { MessageController } from "@/controllers/message.controller";
import authMiddleware from "@/middleware/auth.middleware";
import { Router } from "express";


const messageRouter = Router();
messageRouter.use(authMiddleware);

messageRouter.get('/contacts',  MessageController.getAllContacts);
messageRouter.get('/chats', MessageController.getAllChats);
messageRouter.get('/:id', MessageController.getMessagesByUserId);

messageRouter.post('/send/:id', MessageController.sendMessage);

export default messageRouter;