"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const userController_1 = require("../Controller/userController");
const authenticated_1 = require("../middleware/authenticated");
exports.userRouter = express_1.default.Router();
const userController = new userController_1.UserController();
exports.userRouter.post("/signup", userController.signUp);
exports.userRouter.post("/login", userController.login);
exports.userRouter.get("/balance", authenticated_1.authenticated, userController.getBalance);
