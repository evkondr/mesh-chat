import { GropesController } from "@/controllers/groups.controller";
import authMiddleware from "@/middleware/auth.middleware";
import { Router } from "express";


const groupsRouter = Router();

groupsRouter.use(authMiddleware);

groupsRouter.post('/create',  GropesController.createGroup);

export default groupsRouter;