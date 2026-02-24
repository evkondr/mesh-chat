import { Router } from "express";

const authRouter = Router();

authRouter.post('/signup', (req, res) => {
  res.json({
    message: 'Auth route'
  });
});

authRouter.post('/login', (req, res) => {
  res.json({
    message: 'Auth route'
  });
});


export default authRouter;