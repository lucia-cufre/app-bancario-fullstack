"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const transactionRouter_1 = require("./Router/transactionRouter");
const app_1 = __importDefault(require("./app"));
const userRouter_1 = require("./Router/userRouter");
app_1.default.use("/ng-cash/user", userRouter_1.userRouter);
app_1.default.use("/ng-cash/transactions", transactionRouter_1.transactionRouter);
