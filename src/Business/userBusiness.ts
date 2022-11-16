import { TokenGenerator } from "./../Services/tokenGenerator";
import { UserFunctions } from "./../Services/findUser";
import { regexPassword } from "./../Services/passwordValidation";
import { IdGenerator } from "./../Services/idGenerator";
import { HashManager } from "./../Services/hashManager";
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

const idGenerator = new IdGenerator();
const hashManager = new HashManager();
const tokenGenerator = new TokenGenerator();

export class UserBusiness {
  public signUp = async (input: UserDTO): Promise<void> => {
    try {
      const { username, password } = input;

      if (!username || !password) {
        throw new MissingCredentials();
      }

      const findUserExist = AppDataSource.manager.findOne(User, {
        where: { username },
      });

      if ((await findUserExist) !== null) {
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

    const findUser = new UserFunctions().findUser(username);

    const user = await findUser.then((dados) => {
      const data = dados.map((user) => {
        const u = {
          id: user.id,
          password: user.password,
        };
        return u;
      });
      return data[0];
    });

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

    return token;
  };

  public getBalance = async (token: string) => {
    try {
      const data = tokenGenerator.tokenData(token);

      if (!data.id) {
        throw new Unauthorized();
      }

      const balance = await AppDataSource.getRepository(User)
        .createQueryBuilder("users")
        .select("a.id", "a.balance")
        .where(`users.id = ${data.id}`)
        .andWhere("users.accountId = :a.id")
        .innerJoin("accounts as a", "users.accountId", "a.id");

      return balance;
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  };
}
