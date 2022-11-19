import { UserDTO } from "./../Models/userDTO";
import { UserBusiness } from "./../Business/userBusiness";
import { Request, Response } from "express";
const userBusiness = new UserBusiness();
export class UserController {
  public signUp = async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;

      const user: UserDTO = {
        username,
        password,
      };

      await userBusiness.signUp(user);

      res.status(201).send({ message: "User created." });
    } catch (error: any) {
      res
        .status(error.statusCode || 400)
        .send(error.message || error.sqlMessage);
    }
  };

  public login = async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;

      const user: UserDTO = {
        username,
        password,
      };

      const token = await userBusiness.login(user);

      res.status(200).send({ access_token: token });
    } catch (error: any) {
      res
        .status(error.statusCode || 400)
        .send(error.message || error.sqlMessage);
    }
  };

  public getBalance = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization as string;

      const balance = await userBusiness.getBalance(token);

      res.status(200).send({ balance });
    } catch (error: any) {
      res
        .status(error.statusCode || 400)
        .send(error.message || error.sqlMessage);
    }
  };
}
