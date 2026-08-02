import express from 'express';
import { logout, signin, signup, getMe, updateProfile } from '../controllers/user.controllers.js';
import { verifyToken } from '../middleware/verifyToken.js';
const userRouter = express.Router();


userRouter.post("/register", signup);
userRouter.post("/login", signin);
userRouter.post("/logout", logout);
userRouter.get("/me", verifyToken, getMe);
userRouter.put("/profile", verifyToken, updateProfile);

export { userRouter };