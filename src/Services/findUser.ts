import { AppDataSource } from "../Database/data-source";
import { User } from "../Entities/user";

export class UserFunctions {
  public findUser = async (input: string) => {
    const userRepository = await AppDataSource.getRepository(User);
    const user = userRepository.find({
      select: ["id", "username", "password", "accountId"],
      where: {
        username: input,
      },
    });
    return user;
  };
}
