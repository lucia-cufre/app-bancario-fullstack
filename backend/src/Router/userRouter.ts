import express from "express";
import { UserController } from "../Controller/userController";
import { authenticated } from "../middleware/authenticated";

export const userRouter = express.Router();
const userController = new UserController();

userRouter.post("/signup", userController.signUp);
userRouter.post("/login", userController.login);
userRouter.get("/balance", authenticated, userController.getBalance);
