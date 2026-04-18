import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";
import authMiddleware from "@/middleware/auth.middleware.js";

const authRouter = Router();

authRouter.post('/signup', AuthController.signup);

authRouter.post('/login', AuthController.login);

authRouter.post('/logout', AuthController.logout);

authRouter.post('/refresh', AuthController.refreshToken);

authRouter.get('/check', authMiddleware, AuthController.checkAuth);

export default authRouter;