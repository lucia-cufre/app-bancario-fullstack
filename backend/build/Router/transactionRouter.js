"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionRouter = void 0;
const transactionsController_1 = require("./../Controller/transactionsController");
const express_1 = __importDefault(require("express"));
const authenticated_1 = require("../middleware/authenticated");
exports.transactionRouter = express_1.default.Router();
const transactionController = new transactionsController_1.TransactionController();
exports.transactionRouter.post("/", authenticated_1.authenticated, transactionController.createTransaction);
exports.transactionRouter.get("/", authenticated_1.authenticated, transactionController.getTransactions);
exports.transactionRouter.get("/filter", authenticated_1.authenticated, transactionController.getFilteredTransactions);
