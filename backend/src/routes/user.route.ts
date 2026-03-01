import { UserController } from "@/controllers/user.controller";
import authMiddleware from "@/middleware/auth.middleware";
import { Router } from "express";


const userRouter = Router();

userRouter.patch('/update-profile', authMiddleware, UserController.updateProfile);



export default userRouter;