import { MessageController } from "@/controllers/message.controller";
import { Router } from "express";


const messageRouter = Router();

messageRouter.get('/contacts', MessageController.getAllContacts);
messageRouter.get('/chats', MessageController.getAllChats);
messageRouter.get('/:id', MessageController.getMessagesByUserId);

messageRouter.post('/send/:id', MessageController.sendMessage);

export default messageRouter;