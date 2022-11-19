import { AppDataSource } from "./../Database/data-source";
import { MissingCredentials, Unauthorized } from "./../Error/generalErrors";
import { Filter, TransactionDTO } from "./../Models/transactionTDO";
import { Transactions } from "../Entities/transaction";
import { CustomError } from "../Error/customError";
import { tokenGenerator, functions } from "../Services/instances";

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

      return movement;
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

      const id = user.accountId;

      const movementDebit = await AppDataSource.getRepository(
        Transactions
      ).find({
        where: {
          debitedAccountId: id,
        },
      });

      const movementCredit = await AppDataSource.getRepository(
        Transactions
      ).find({
        where: {
          creditedAccountId: id,
        },
      });

      if (filter === "debit") {
        return movementDebit;
      } else {
        return movementCredit;
      }
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  };
}
