import { AppDataSource } from "../Database/data-source";
import { OutOfCash } from "../Error/transactionError";
import { Account } from "../Entities/account";
import { User } from "../Entities/user";
import { UserNotFound } from "../Error/userError";
import { idGenerator } from "./instances";
import { Transactions } from "../Entities/transaction";
import { CustomError } from "../Error/customError";
import { Unauthorized } from "../Error/generalErrors";

export class Functions extends User {
  public findUserByUsername = async (input: string) => {
    try {
      const user = await AppDataSource.getRepository(User).findOne({
        select: ["id", "username", "password", "accountId"],
        where: {
          username: input,
        },
      });

      return user;
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  };

  public findUserById = async (id: string) => {
    try {
      const user = await AppDataSource.getRepository(User).findOne({
        where: {
          id: id,
        },
      });
      if (!user) {
        throw new UserNotFound();
      }
      return user;
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  };

  public findBalanceById = async (accountId: string) => {
    try {
      const account = await AppDataSource.getRepository(Account).findOne({
        select: ["balance"],
        where: {
          id: accountId,
        },
      });
      if (!account) {
        throw new UserNotFound();
      }
      const result: number = account.balance;
      return result;
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  };

  public debited = async (id: string, value: number) => {
    try {
      const repository = AppDataSource.getRepository(Account);
      const user = await this.findUserById(id);
      const account = await repository.findOne({
        where: {
          id: user.accountId,
        },
      });
      if (!account) {
        throw new Error("Account does not exists.");
      }
      const newBalance = account.balance - value;
      const result = await repository
        .createQueryBuilder()
        .update({
          balance: newBalance,
        })
        .where({ id: user.accountId })
        .execute();

      return result;
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  };

  public credited = async (username: string, value: number) => {
    try {
      const repository = AppDataSource.getRepository(Account);
      const user = await this.findUserByUsername(username);
      if (!user) {
        throw new UserNotFound();
      }
      const account = await repository.findOne({
        where: {
          id: user.accountId,
        },
      });
      if (!account) {
        throw new Error("Account does not exists.");
      }
      const newBalance = Number(account.balance) + Number(value);
      const result = await repository
        .createQueryBuilder()
        .update({
          balance: newBalance,
        })
        .where({ id: user.accountId })
        .execute();

      return result;
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  };

  public transaction = async (id: string, username: string, value: number) => {
    try {
      const transactionId: string = idGenerator.generateId();
      const userDebit = await this.findUserById(id);
      const userCredit = await this.findUserByUsername(username);
      if (!userCredit) {
        throw new UserNotFound();
      }
      if (userDebit.id === userCredit.id) {
        throw new Error("Is not possible make a transaction to yourself.");
      }
      if (userDebit.id !== id) {
        throw new Unauthorized();
      }
      const transaction = AppDataSource.getRepository(Transactions).create({
        id: transactionId,
        debitedAccountId: userDebit.accountId,
        creditedAccountId: userCredit.accountId,
        value: value,
      });

      await AppDataSource.getRepository(Transactions).save(transaction);
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  };

  public isValidTransaction = async (
    value: number,
    id: string,
    username: string
  ) => {
    try {
      const balance = await this.findBalanceById(id);
      if (value <= 0) throw new Error("Invalid value");

      if (balance <= 0 || value > balance) {
        throw new OutOfCash();
      }

      this.debited(id, value);
      this.credited(username, value);
      this.transaction(id, username, value);
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  };
}
