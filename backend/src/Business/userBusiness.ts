import { regexPassword } from "./../Services/passwordValidation";
import { Account } from "./../Entities/account";
import { MissingCredentials, Unauthorized } from "./../Error/generalErrors";
import {
  InvalidCredentials,
  InvalidPassword,
  InvalidUsername,
  UsernameExists,
  UserNotFound,
} from "./../Error/userError";
import { CustomError } from "./../Error/customError";
import { AppDataSource } from "./../Database/data-source";
import { User } from "../Entities/user";
import { UserDTO } from "../Models/userDTO";
import {
  hashManager,
  idGenerator,
  tokenGenerator,
  functions,
} from "../Services/instances";

export class UserBusiness {
  public signUp = async (input: UserDTO): Promise<void> => {
    try {
      const { username, password } = input;

      if (!username || !password) {
        throw new MissingCredentials();
      }

      const findUserExist = await functions.findUserByUsername(username);

      if (findUserExist) {
        throw new UsernameExists();
      }
      if (username.length < 3) {
        throw new InvalidUsername();
      }

      const passwordValidation = regexPassword();

      if (passwordValidation.test(password) !== true) {
        throw new InvalidPassword();
      }

      const hashPassword: string = await hashManager.hash(password);
      const id: string = idGenerator.generateId();

      const account = AppDataSource.manager.create(Account, {
        id: id,
        balance: 100,
      });

      const user = AppDataSource.manager.create(User, {
        id,
        username,
        password: hashPassword,
        accountId: account.id,
      });

      await AppDataSource.manager.save(account);

      await AppDataSource.manager.save(user);
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  };

  public login = async (input: UserDTO): Promise<string> => {
    const { username, password } = input;

    if (!username || !password) {
      throw new MissingCredentials();
    }

    const user = await functions.findUserByUsername(username);

    if (!user) {
      throw new UserNotFound();
    }

    const isPasswordCorrect: boolean = await hashManager.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      throw new InvalidCredentials();
    }

    const token = tokenGenerator.generateToken(user.id);
    const validToken = tokenGenerator.tokenData(token);

    if (validToken.id !== user.id) {
      throw new Unauthorized();
    }

    return token;
  };

  public getBalance = async (token: string) => {
    try {
      const data = tokenGenerator.tokenData(token);

      const account = await AppDataSource.getRepository(User).findOne({
        relations: {
          account: true,
        },
        where: {
          id: data.id,
        },
      });

      if (!account) {
        throw new UserNotFound();
      }
      if (account.id !== data.id) {
        throw new Unauthorized();
      }

      return account.account;
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  };
}
