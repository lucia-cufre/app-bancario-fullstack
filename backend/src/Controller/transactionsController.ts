import { Filter, TransactionDTO } from "./../Models/transactionTDO";
import { TransactionsBusiness } from "./../Business/transactionBusiness";
import { Request, Response } from "express";
const transactionBusiness = new TransactionsBusiness();

export class TransactionController {
  public createTransaction = async (req: Request, res: Response) => {
    try {
      const { username, value } = req.body;
      const token = req.headers.authorization as string;

      const transaction: TransactionDTO = {
        username,
        value,
      };

      await transactionBusiness.createTransaction(transaction, token);

      res.status(201).send({ message: "Transaction done!" });
    } catch (error: any) {
      res
        .status(error.statusCode || 400)
        .send(error.message || error.sqlMessage);
    }
  };

  public getTransactions = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization as string;

      const transactions = await transactionBusiness.getTransactions(token);

      res.status(200).send({ transactions });
    } catch (error: any) {
      res
        .status(error.statusCode || 400)
        .send(error.message || error.sqlMessage);
    }
  };

  public getFilteredTransactions = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization as string;
      const filter = req.query.sort as Filter

      const transactions = await transactionBusiness.getFilteredTransactions(token, filter);

      res.status(200).send({ transactions });
    } catch (error: any) {
      res
        .status(error.statusCode || 400)
        .send(error.message || error.sqlMessage);
    }
  };


}
