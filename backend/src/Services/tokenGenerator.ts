import * as jwt from "jsonwebtoken";
require("dotenv").config();

export type AuthenticationData = {
  id: string;
};

export class Authenticator {
  public getUnsafeTokenData = (token: string): AuthenticationData => {
    const tokenData = jwt.decode(token) as any;
    return {
      id: tokenData.id,
    };
  };

  public generateToken = (id: string) => {
    const token = jwt.sign({ id }, process.env.JWT_KEY as string, {
      expiresIn: "24h",
    });
    return token;
  };

  public tokenData = (token: string): AuthenticationData => {
    const payload = jwt.verify(
      token,
      process.env.JWT_KEY as string
    ) as jwt.JwtPayload;

    return { id: payload.id as string };
  };
}
