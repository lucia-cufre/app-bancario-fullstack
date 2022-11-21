import { TransactionController } from "./../Controller/transactionsController";
import express from "express";
import { authenticated } from "../middleware/authenticated";

export const transactionRouter = express.Router();
const transactionController = new TransactionController();

transactionRouter.post(
  "/",
  authenticated,
  transactionController.createTransaction
);
transactionRouter.get(
  "/",
  authenticated,
  transactionController.getTransactions
);
transactionRouter.get(
  "/filter",
  authenticated,
  transactionController.getFilteredTransactions
);
