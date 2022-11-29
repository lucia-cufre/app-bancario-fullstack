import { AppDataSource } from "./../Database/data-source";
import { MissingCredentials, Unauthorized } from "./../Error/generalErrors";
import { Filter, TransactionDTO } from "./../Models/transactionTDO";
import { Transactions } from "../Entities/transaction";
import { CustomError } from "../Error/customError";
import { tokenGenerator, functions } from "../Services/instances";
import dayjs from "dayjs";

export class TransactionsBusiness {
  public createTransaction = async (
    input: TransactionDTO,
    token: string
  ): Promise<void> => {
    try {
      const { username, value } = input;

      if (!username || !value) {
        throw new MissingCredentials();
      }

      const data = tokenGenerator.tokenData(token);
       
      await functions.isValidTransaction(value, data.id, username);
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  };

  public getTransactions = async (token: string) => {
    try {
      const data = tokenGenerator.tokenData(token);

      const user = await functions.findUserById(data.id);

      if (user.id !== data.id) {
        throw new Unauthorized();
      }

      const id = user.accountId;

      const movement = await AppDataSource.getRepository(Transactions).find({
        where: [
          {
            debitedAccountId: id,
          },
          {
            creditedAccountId: id,
          },
        ],
        order: {
          createdAt: "DESC",
        },
      });

      if (!movement) {
        throw new Error("It wasn't possible obtain the history");
      }

      const transactions = movement.map((data) => {
        var localizedFormat = require("dayjs/plugin/localizedFormat");
        dayjs.extend(localizedFormat);
        const date = dayjs(data.createdAt).format("L");
        const newObject = {
          id: data.id,
          creditAccount: data.creditedAccountId,
          debitAccount: data.debitedAccountId,
          value: data.value,
          createdAt: date,
        };

        return newObject;
      });

      return transactions;
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  };

  public getFilteredTransactions = async (token: string, input: Filter) => {
    try {
      const data = tokenGenerator.tokenData(token);
      const filter = input;

      if (filter !== "debit" && filter !== "credit") {
        throw new Error("debit and credit are the values for filter.");
      }

      const user = await functions.findUserById(data.id);

      if (user.id !== data.id) {
        throw new Unauthorized();
      }

      const id = user.accountId;

      const movementDebit = await AppDataSource.getRepository(
        Transactions
      ).find({
        where: {
          debitedAccountId: id,
        },
        order: {
          createdAt: "DESC",
        },
      });

      const debitTransaction = movementDebit.map((data: Transactions) => {
        var localizedFormat = require("dayjs/plugin/localizedFormat");
        dayjs.extend(localizedFormat);
        const date = dayjs(data.createdAt).format("L");
        const newObject = {
          id: data.id,
          creditAccount: data.creditedAccountId,
          debitAccount: data.debitedAccountId,
          value: data.value,
          createdAt: date,
        };

        return newObject;
      });

      const movementCredit = await AppDataSource.getRepository(
        Transactions
      ).find({
        where: {
          creditedAccountId: id,
        },
        order: {
          createdAt: "DESC",
        },
      });
      const creditTransaction = movementCredit.map((data: Transactions) => {
        var localizedFormat = require("dayjs/plugin/localizedFormat");
        dayjs.extend(localizedFormat);
        const date = dayjs(data.createdAt).format("L");
        const newObject = {
          id: data.id,
          creditAccount: data.creditedAccountId,
          debitAccount: data.debitedAccountId,
          value: data.value,
          createdAt: date,
        };

        return newObject;
      });

      if (filter === "debit") {
        return debitTransaction;
      } else {
        return creditTransaction;
      }
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  };
}
